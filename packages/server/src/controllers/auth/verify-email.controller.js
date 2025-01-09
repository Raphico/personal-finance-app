import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { users } from "../../db/schema.js";
import { ApiResponse } from "../../utils/api-response.js";
import { verifyEmailSchema } from "../../validators/auth.validator.js";

export const verifyEmail = asyncHandler(
  async function verifyEmail(request, response) {
    const { error, data } = verifyEmailSchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: "invalid verification code",
        statusCode: 400,
      });
    }

    const { code } = data;

    const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

    const user = await db.query.users.findFirst({
      columns: {
        id: true,
        emailVerificationExpiry: true,
      },
      where: eq(users.emailVerificationCode, hashedCode),
    });

    if (!user) {
      throw new ApiError({
        message: "invalid verification code",
        statusCode: 400,
      });
    }

    if (Date.now() > user.emailVerificationExpiry.getTime()) {
      throw new ApiError({
        message: "verification code has expired",
        statusCode: 400,
      });
    }

    await db
      .update(users)
      .set({
        isEmailVerified: true,
        emailVerificationCode: null,
        emailVerificationExpiry: null,
      })
      .where(eq(user.id, users.id));

    response.status(200).json(
      new ApiResponse({
        data: {
          isEmailVerified: true,
        },
        message: "email verification successful",
        status: "ok",
      })
    );
  }
);

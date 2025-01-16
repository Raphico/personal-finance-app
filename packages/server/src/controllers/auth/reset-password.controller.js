import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { generateHash } from "../../services/token.service.js";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { passwordSchema } from "@repo/shared-validators/auth";
import { users } from "../../db/schema.js";
import { ApiResponse } from "../../utils/api-response.js";

export const resetPassword = asyncHandler(
  async function resetPassword(request, response) {
    const { token } = request.params;

    if (!token) {
      throw new ApiError({
        message: "password reset token is required",
        statusCode: 400,
      });
    }

    const { error, data } = passwordSchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: error.errors[0]?.message,
        statusCode: 400,
      });
    }

    const { password } = data;

    const hashedToken = generateHash(token);

    const user = await db.query.users.findFirst({
      columns: {
        id: true,
        passwordResetExpiry: true,
      },
      where: eq(users.passwordResetToken, hashedToken),
    });

    if (!user) {
      throw new ApiError({
        message: "invalid token",
        statusCode: 401,
      });
    }

    if (Date.now() > user.passwordResetExpiry.getTime()) {
      throw new ApiError({
        message:
          "The reset link has expired. Please request a new password reset",
        statusCode: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .update(users)
      .set({
        password: hashedPassword,
        passwordResetExpiry: null,
        passwordResetToken: null,
      })
      .where(eq(users.id, user.id));

    response.status(200).json(
      new ApiResponse({
        data: null,
        message: "password reset successful",
        status: "ok",
      })
    );
  }
);

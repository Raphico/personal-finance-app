import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { emailSchema } from "@repo/shared-validators/auth";
import { users } from "../../db/schema.js";
import { generateVerificationCode } from "../../services/token.service.js";
import {
  emailVerificationTemplate,
  sendEmail,
} from "../../services/mail.service.js";
import { ApiResponse } from "../../utils/api-response.js";

export const resendEmailVerification = asyncHandler(
  async function (request, response) {
    const { data, error } = emailSchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: error.errors[0]?.message,
        statusCode: 400,
      });
    }

    const { email } = data;

    const user = await db.query.users.findFirst({
      columns: {
        id: true,
        name: true,
        isEmailVerified: true,
      },
      where: eq(users.email, email),
    });

    if (!user) {
      // Avoid revealing user existence for security reasons
      throw new ApiError({
        message:
          "If the email exists in our records, you will receive a verification code",
        statusCode: 202,
      });
    }

    if (user.isEmailVerified) {
      throw new ApiError({
        message:
          "Your email is already verified. No further action is required",
        statusCode: 409,
      });
    }

    const { unHashedCode, hashedCode, expiresAt } = generateVerificationCode();

    await db
      .update(users)
      .set({
        emailVerificationCode: hashedCode,
        emailVerificationExpiry: expiresAt,
      })
      .where(eq(users.id, user.id));

    await sendEmail({
      emailContent: emailVerificationTemplate({
        username: user.name,
        emailVerificationCode: unHashedCode,
      }),
      to: email,
      subject: "Email verification",
    });

    response.status(202).json(
      new ApiResponse({
        data: null,
        status: "ok",
        message:
          "If the email exists in our records, you will receive a verification code shortly.",
      })
    );
  }
);

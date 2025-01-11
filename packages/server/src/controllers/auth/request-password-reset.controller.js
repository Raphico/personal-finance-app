import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { emailSchema } from "../../validators/auth.validator.js";
import { users } from "../../db/schema.js";
import {
  passwordResetTemplate,
  sendEmail,
} from "../../services/mail.service.js";
import { ApiResponse } from "../../utils/api-response.js";
import { env } from "../../config.js";
import { generateVerificationToken } from "../../services/token.service.js";

export const requestPasswordReset = asyncHandler(
  async function requestPasswordReset(request, response) {
    const { error, data } = emailSchema.safeParse(request.body);

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
        email: true,
      },
      where: eq(users.email, email),
    });

    if (!user) {
      // Avoid revealing user existence for security reasons
      throw new ApiError({
        message:
          "If the email exists in our records, you will receive a password reset",
        statusCode: 200,
      });
    }

    const { unHashedToken, hashedToken, expiresAt } =
      generateVerificationToken();

    await db
      .update(users)
      .set({
        passwordResetToken: hashedToken,
        passwordResetExpiry: expiresAt,
      })
      .where(eq(users.id, user.id));

    await sendEmail({
      emailContent: passwordResetTemplate({
        username: user.name,
        passwordResetUrl: `${env.CLIENT_PASSWORD_RESET_URL}/${unHashedToken}`,
      }),
      to: user.email,
      subject: "Change personal finance app password",
    });

    response.status(200).json(
      new ApiResponse({
        data: null,
        message:
          "If your email is in our records, a password reset link will be sent shortly",
        status: "ok",
      })
    );
  }
);

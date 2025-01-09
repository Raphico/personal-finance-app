import bcrypt from "bcrypt";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { signupSchema } from "../../validators/auth.validator.js";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema.js";
import { ApiResponse } from "../../utils/api-response.js";
import { generateVerificationToken } from "../../services/token.service.js";
import {
  emailVerificationTemplate,
  sendEmail,
} from "../../services/mail.service.js";
import { VERIFICATION_TOKEN_EXPIRY } from "../../config.js";

export const signup = asyncHandler(async function signup(request, response) {
  const { error, data } = signupSchema.safeParse(request.body);

  if (error) {
    throw new ApiError({
      message: error.errors[0]?.message,
      statusCode: 400,
    });
  }

  const { email, name, password } = data;

  const userExists = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: eq(users.email, email),
  });

  if (userExists) {
    throw new ApiError({
      message: "user already exists",
      statusCode: 409,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { unHashedToken, hashedToken, expiresAt } = generateVerificationToken();

  const user = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: expiresAt,
    })
    .returning({ id: users.id, name: users.name, email: users.email });

  await sendEmail({
    emailContent: emailVerificationTemplate({
      username: name,
      emailVerificationLink: `${request.protocol}//:${request.get("host")}/api/v1/auth/verify-email/${unHashedToken}`,
      expiresIn: `${VERIFICATION_TOKEN_EXPIRY / 60000} minutes`,
    }),
    to: email,
    subject: "Email verification",
  });

  response.status(201).json(
    new ApiResponse({
      data: user,
      message:
        "User signup successful. A verification email has been sent to your email",
      status: "ok",
    })
  );
});

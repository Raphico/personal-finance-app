import bcrypt from "bcrypt";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { signupSchema } from "@repo/shared-validators/auth";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema.js";
import { ApiResponse } from "../../utils/api-response.js";
import { generateVerificationCode } from "../../services/token.service.js";
import {
  emailVerificationTemplate,
  sendEmail,
} from "../../services/mail.service.js";

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
  const { unHashedCode, hashedCode, expiresAt } = generateVerificationCode();

  const user = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
      emailVerificationCode: hashedCode,
      emailVerificationExpiry: expiresAt,
    })
    .returning({ id: users.id, name: users.name, email: users.email });

  await sendEmail({
    emailContent: emailVerificationTemplate({
      username: name,
      emailVerificationCode: unHashedCode,
    }),
    to: email,
    subject: "Email verification",
  });

  response.status(201).json(
    new ApiResponse({
      data: user,
      message:
        "User signup successful. A verification code has been sent to your email",
      status: "ok",
    })
  );
});

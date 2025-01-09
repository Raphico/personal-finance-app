import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { loginSchema } from "../../validators/auth.validator.js";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/token.service.js";
import { env } from "../../config.js";
import { redisClient } from "../../services/redis.service.js";

export const login = asyncHandler(async function login(request, response) {
  const { error, data } = loginSchema.safeParse(request.body);

  if (error) {
    throw new ApiError({
      message: error.errors[0]?.message,
      statusCode: 400,
    });
  }

  const { email, password } = data;

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      name: true,
      email: true,
      isEmailVerified: true,
      password: true,
    },
    where: eq(users.email, email),
  });

  if (!user) {
    // generic error message to prevent attackers from distinguishing between valid and invalid emails
    throw new ApiError({
      message: "invalid email or password",
      statusCode: 400,
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new ApiError({
      message: "invalid email or password",
      statusCode: 400,
    });
  }

  if (!user.isEmailVerified) {
    throw new ApiError({
      message: "Please, verify your email to login",
      statusCode: 403,
    });
  }

  const accessToken = generateAccessToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });
  const refreshToken = generateRefreshToken({
    id: user.id,
  });

  const cookieOptions = {
    secure: env.NODE_ENV == "production",
    httpOnly: true,
  };

  await redisClient.set(`user:${user.id}:refreshToken`, refreshToken);

  response
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
        },
        message: "login successful",
        status: "ok",
      })
    );
});

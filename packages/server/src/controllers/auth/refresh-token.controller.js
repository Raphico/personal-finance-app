import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { env } from "../../config.js";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema.js";
import { redisClient } from "../../services/redis.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/token.service.js";
import { ApiResponse } from "../../utils/api-response.js";

export const refreshToken = asyncHandler(
  async function refreshToken(request, response) {
    let { refreshToken } = request.cookies;

    if (!refreshToken) {
      throw new ApiError({
        message: "unauthorized",
        statusCode: 401,
      });
    }

    try {
      const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);

      const user = await db.query.users.findFirst({
        columns: {
          id: true,
          name: true,
          email: true,
        },
        where: eq(users.id, decoded.id),
      });

      if (!user) {
        throw new ApiError({
          message: "invalid token",
          statusCode: 401,
        });
      }

      const match = await redisClient.get(`user:${user.id}:refreshToken`);
      if (!match || match !== refreshToken) {
        throw new ApiError({
          message: "invalid token",
          statusCode: 401,
        });
      }

      const accessToken = generateAccessToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });
      refreshToken = generateRefreshToken({
        id: user.id,
      });

      const cookieOptions = {
        httpOnly: true,
        secure: env.NODE_ENV == "production",
      };

      await redisClient.set(`user:${user.id}:refreshToken`, refreshToken);

      response
        .status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(
          new ApiResponse({
            data: null,
            message: "access token refresh successful",
            status: "ok",
          })
        );
    } catch (error) {
      if (
        error.name == "TokenExpiredError" ||
        error.name == "JsonWebTokenError"
      ) {
        throw new ApiError({
          message: "invalid token",
          statusCode: 401,
        });
      }

      throw error;
    }
  }
);

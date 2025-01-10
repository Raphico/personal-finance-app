import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { env } from "../config.js";
import { db } from "../db/index.js";
import { and, eq } from "drizzle-orm";
import { users } from "../db/schema.js";
import { asyncHandler } from "../utils/async-handler.js";

export const verifyJWT = asyncHandler(
  async function verifyJWT(request, response, next) {
    const { accessToken } = request.cookies;

    if (!accessToken) {
      throw new ApiError({
        message: "unauthorized",
        statusCode: 401,
      });
    }

    try {
      const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

      const user = await db.query.users.findFirst({
        columns: {
          id: true,
          email: true,
          name: true,
        },
        where: and(eq(users.id, decoded.id), eq(users.email, decoded.email)),
      });

      if (!user) {
        throw new ApiError({
          message: "invalid token",
          statusCode: 401,
        });
      }

      request.user = user;

      next();
    } catch (error) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
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

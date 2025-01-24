import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { redisClient } from "../services/redis.service.js";

export const healthCheck = asyncHandler(
  async function healthCheck(_, response) {
    try {
      await db.execute(sql`SELECT 1`);
      const redisPing = await redisClient.ping();
      response.status(200).json(
        new ApiResponse({
          data: {
            postgres: "UP",
            redis: redisPing == "PONG" ? "UP" : "DOWN",
            uptime: Math.floor(process.uptime()),
          },
          status: "UP",
        })
      );
    } catch (error) {
      throw new ApiError({
        statusCode: 503,
        message: error.message,
      });
    }
  }
);

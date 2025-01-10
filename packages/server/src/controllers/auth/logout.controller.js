import { env } from "../../config.js";
import { redisClient } from "../../services/redis.service.js";
import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const logout = asyncHandler(async function logout(request, response) {
  await redisClient.del(`user:${request.user.id}:refreshToken`);

  const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV == "production",
  };

  response
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
      new ApiResponse({
        data: null,
        message: "logout successful",
        status: "ok",
      })
    );
});

import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";

export const getCurrentUser = asyncHandler(
  async function getUser(request, response) {
    response.status(200).json(
      new ApiResponse({
        data: request.user,
        status: "ok",
        message: "user retrieved successfully",
      })
    );
  }
);

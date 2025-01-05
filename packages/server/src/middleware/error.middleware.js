import { env } from "../env.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export function errorMiddleware(error, request, response, next) {
  const isApiError = error instanceof ApiError;
  const statusCode = isApiError ? error.statusCode : 500;
  const errorMessage = isApiError
    ? error.message
    : "Something went wrong. Please try again later";

  response.status(statusCode).json(
    new ApiResponse({
      data: null,
      message: errorMessage,
      status: "error",
      ...(env.NODE_ENV == "development" ? { stack: error?.stack } : {}),
    })
  );
}

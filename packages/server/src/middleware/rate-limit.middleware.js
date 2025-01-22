import { rateLimit } from "express-rate-limit";
import { ApiError } from "../utils/api-error.js";

const defaultConfig = {
  standardHeaders: true, // include standard rate limit headers in the response
  legacyHeaders: false, // disable `X-RateLimit-*` headers
  keyGenerator: (request, _) => request.clientIp, // use the IP address from request-ip
  handler: (_, __, ___, options) => {
    throw new ApiError({
      message: `Too many requests. Try again later`,
      statusCode: options.statusCode,
    });
  },
};

/**@description Rate limit for resource-intensive endpoints such as sending emails */
export const strictLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 3, // Limit each IP to 3 requests per 15 minutes
});

/**@description Rate limit for user actions that occur more frequently but should still be throttled to prevent abuse.
 */
export const moderateLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 15 * 60 * 1000, // 15 minute
  limit: 10, // Limit each IP to 10 requests per 15 minutes
});

/**@description Rate limit for general endpoints */
export const flexibleLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 per 15 minutes
});

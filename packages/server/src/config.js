import { z } from "zod";

// expiry for email verifications codes, password resets email, etc
export const VERIFICATION_EXPIRY = 15 * 60 * 1000; // 15 minutes

export const { data: env } = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development")
      .describe("Specifies the current environment mode of the application"),
    DATABASE_URL: z.string().url().describe("Database connection URL"),
    HOST_URL: z.string().url().describe("The base URL of the server"),
    SMTP_HOST: z.string().describe("SMTP server hostname for sending emails"),
    SMTP_PORT: z
      .number({ coerce: true })
      .describe("Port number for the SMTP server"),
    SMTP_USERNAME: z.string().describe("Username for SMTP authentication"),
    SMTP_PASSWORD: z.string().describe("Password for SMTP authentication"),
    SENDER_EMAIL_ADDRESS: z
      .string()
      .email()
      .describe("Email address used to send outgoing emails"),
    CLIENT_URL: z
      .string()
      .url()
      .describe("The base URL of the frontend client"),
    ACCESS_TOKEN_SECRET: z
      .string()
      .describe("Secret key used for signing access tokens"),
    REFRESH_TOKEN_SECRET: z
      .string()
      .describe("Secret key used for signing refresh tokens"),
    ACCESS_TOKEN_EXPIRY: z
      .string()
      .describe("Expiration duration for access tokens (e.g., '15m', '1h')"),
    REFRESH_TOKEN_EXPIRY: z
      .string()
      .describe("Expiration duration for refresh tokens (e.g., '7d', '30d')"),
    CLIENT_PASSWORD_RESET_URL: z
      .string()
      .url()
      .describe("Frontend URL for the password reset page"),
    REDIS_URL: z.string().describe("Connection URL for the Redis server"),
    PORT: z
      .number({ coerce: true })
      .default(8080)
      .describe("Port on which the server listens for incoming HTTP requests"),
    CORS_ORIGIN: z
      .string()
      .describe(
        "Specifies the allowed origin(s) for cross-origin requests (CORS)"
      ),
    CORS_METHODS: z
      .string()
      .default("*")
      .describe(
        "Defines the allowed HTTP methods for cross-origin requests (CORS)"
      ),
    CORS_ALLOWED_HEADERS: z
      .string()
      .default("*")
      .describe(
        "Lists all HTTP headers allowed in a cross-origin request (CORS)"
      ),
  })
  .safeParse(process.env);

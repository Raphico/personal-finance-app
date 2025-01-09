import { z } from "zod";

// expiry for email verifications, password resets email, etc
export const VERIFICATION_TOKEN_EXPIRY = 30 * 60 * 1000; // 30 minutes

export const { data: env } = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().url(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.number({ coerce: true }),
    SMTP_USERNAME: z.string(),
    SMTP_PASSWORD: z.string(),
    SENDER_EMAIL_ADDRESS: z.string().email(),
    CLIENT_URL: z.string().url(),
    PORT: z
      .number({ coerce: true })
      .default(8080)
      .describe("port to listen for incoming http requests"),
    CORS_ORIGIN: z
      .string()
      .describe("specifies the allowed origin(s) for cross-origin requests"),
    CORS_METHODS: z
      .string()
      .default("*")
      .describe("defines the allowed methods for cross-origin requests"),
    CORS_ALLOWED_HEADERS: z
      .string()
      .default("*")
      .describe("list all headers that are allowed in a cross-origin request"),
  })
  .safeParse(process.env);
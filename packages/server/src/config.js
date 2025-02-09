import { z } from "zod";

// expiry for email verifications codes, password resets email, etc
export const VERIFICATION_EXPIRY = 15 * 60 * 1000; // 15 minutes

export const budgetCategories = [
  "entertainment",
  "bills",
  "groceries",
  "dining-out",
  "transportation",
  "personal-care",
  "education",
  "lifestyle",
  "shopping",
  "general",
];

export const themes = [
  "green",
  "yellow",
  "cyan",
  "navy",
  "red",
  "purple",
  "pink",
  "turquoise",
  "brown",
  "magenta",
  "blue",
  "navy-grey",
  "army-green",
  "gold",
  "orange",
];

export const { data: env } = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().url(),
    HOST_URL: z.string().url().describe("identifies the server url"),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.number({ coerce: true }),
    SMTP_USERNAME: z.string(),
    SMTP_PASSWORD: z.string(),
    SENDER_EMAIL_ADDRESS: z.string().email(),
    CLIENT_URL: z.string().url(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRY: z.string(),
    REFRESH_TOKEN_EXPIRY: z.string(),
    CLIENT_PASSWORD_RESET_URL: z.string().url(),
    REDIS_URL: z.string(),
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

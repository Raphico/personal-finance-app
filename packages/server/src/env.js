import { z } from "zod";

export const { data: env } = z
  .object({
    PORT: z
      .number({ coerce: true })
      .default(8080)
      .describe("port to listen for incoming http requests"),
  })
  .safeParse(process.env);

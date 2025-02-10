import { budgetCategories, themes } from "@repo/shared-config";
import { z } from "zod";

export const budgetSchema = z.object({
  category: z.enum(budgetCategories, {
    message: "invalid budget category",
  }),
  maximumSpend: z.coerce
    .number({ required_error: "maximum spend is required" })
    .min(1, { message: "maximum spend must be at least $1" })
    .max(1_000_000, { message: "maximum spend must not exceed $1,000,000" }),
  theme: z.enum(themes, {
    message: "invalid theme",
  }),
});

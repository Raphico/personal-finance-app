import { z } from "zod";
import { budgetCategories } from "@repo/shared-config";

export const transactionSchema = z.object({
  name: z
    .string({ required_error: "transaction name is required" })
    .min(3, { message: "name must be at least 3 characters" })
    .max(30, { message: "name must not exceed 30 characters" }),
  category: z.enum(["income", ...budgetCategories], {
    message: "invalid transaction category",
  }),
  date: z
    .string({ required_error: "transaction date is required" })
    .date({ message: "invalid transaction date" }),
  amount: z.coerce
    .number({ required_error: "transaction amount is required" })
    .min(0.01, { message: "amount must be at least $0.01" })
    .max(1_000_000, { message: "amount must not exceed $1,000,000" }),
  isRecurring: z.boolean().default(false),
});

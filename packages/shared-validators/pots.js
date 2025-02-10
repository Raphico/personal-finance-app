import { themes } from "@repo/shared-config";
import { z } from "zod";

export const potSchema = z.object({
  name: z
    .string({ required_error: "pot name is required" })
    .toLowerCase()
    .min(3, {
      message: "name must be at least 3 characters",
    })
    .max(30, {
      message: "name must not exceed 30 characters",
    }),
  target: z.coerce
    .number({ required_error: "target is required" })
    .min(1, { message: "target must be at least $1" })
    .max(1_000_000, { message: "target must not exceed $1,000,000" }),
  theme: z.enum(themes, {
    message: "invalid theme",
  }),
});

export const addWithdrawMoneySchema = z.object({
  amount: z.coerce
    .number({ required_error: "amount is required" })
    .min(-1_000_000, {
      message: "withdrawal amount must not exceed $1,000,000",
    })
    .max(1_000_000, { message: "deposit amount must not exceed $1,000,000" })
    .refine((amount) => amount !== 0, {
      message: "amount cannot be zero",
    }),
});

export const updatePotSchema = potSchema.partial();

import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(3, { message: "name must be at least 3 characters long" })
    .max(100, { message: "name must be less than 100 characters long" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Please provide a valid email address" })
    .toLowerCase()
    .max(254, { message: "email must be less than 254 characters long" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters long" }),
});

export const verifyEmailSchema = z.object({
  code: z
    .string({ required_error: "verification code is required" })
    .min(6, { message: "verification code must be 6 characters long" })
    .max(6, { message: "verification code must be 6 characters long" }),
});

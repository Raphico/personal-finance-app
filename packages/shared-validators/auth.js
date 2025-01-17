import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Please provide a valid email address" })
    .toLowerCase()
    .max(254, { message: "email must be less than 254 characters long" }),
});

export const passwordSchema = z.object({
  password: z
    .string({ required_error: "Please provide a password" })
    .min(8, { message: "password must be at least 8 characters long" }),
});

export const loginSchema = z.object({
  email: emailSchema.shape.email,
  password: passwordSchema.shape.password,
});

export const signupSchema = z.object({
  name: z
    .string({ required_error: "Please provide a name" })
    .min(3, { message: "name must be at least 3 characters long" })
    .max(100, { message: "name must be less than 100 characters long" }),
  email: emailSchema.shape.email,
  password: passwordSchema.shape.password,
});

export const verifyEmailSchema = z.object({
  code: z
    .string({ required_error: "Please provide a verification code" })
    .min(6, { message: "verification code must be 6 characters long" })
    .max(6, { message: "verification code must be 6 characters long" }),
});

export default loginSchema;

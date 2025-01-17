import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./utils.js";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: varchar({ length: 25 }).$default(createId).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  isEmailVerified: boolean("is_email_verified").notNull().default(false),
  emailVerificationCode: varchar("email_verification_code", { length: 64 }),
  emailVerificationExpiry: timestamp("email_verification_expiry"),
  passwordResetToken: varchar("password_reset_token", { length: 64 }),
  passwordResetExpiry: timestamp("password_reset_expiry"),
  ...timestamps,
});

import {
  boolean,
  date,
  decimal,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./utils.js";
import { createId } from "@paralleldrive/cuid2";
import {
  budgetCategories,
  transactionCategories,
  themes,
} from "@repo/shared-config";

export const transactionCategoryEnum = pgEnum(
  "transaction_category",
  transactionCategories
);
export const budgetCategoryEnum = pgEnum("budget_category", budgetCategories);
export const themeEnum = pgEnum("theme", themes);
export const transactionStatus = pgEnum("status", ["active", "voided"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 25 }).$default(createId).primaryKey(),
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

export const transactions = pgTable("transactions", {
  id: varchar("id", { length: 25 }).$default(createId).primaryKey(),
  userId: varchar("user_id", { length: 25 })
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 30 }).notNull(),
  category: transactionCategoryEnum("category").notNull(),
  date: date("transaction_date", { mode: "string" }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: transactionStatus("status").default("active").notNull(),
  isRecurring: boolean("is_recurring").default(false).notNull(),
  ...timestamps,
});

export const budgets = pgTable("budgets", {
  id: varchar("id", { length: 25 }).$default(createId).primaryKey(),
  userId: varchar("user_id", { length: 25 })
    .notNull()
    .references(() => users.id),
  category: budgetCategoryEnum("category").notNull(),
  maximumSpend: decimal("maximum_spend", { precision: 10, scale: 2 }).notNull(),
  theme: themeEnum("theme").notNull(),
  ...timestamps,
});

export const pots = pgTable("pots", {
  id: varchar("id", { length: 25 }).$default(createId).primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  userId: varchar("user_id", { length: 25 })
    .notNull()
    .references(() => users.id),
  target: decimal("target", { precision: 10, scale: 2 }).notNull(),
  totalSaved: decimal("total_saved", { precision: 10, scale: 2 })
    .default(0)
    .notNull(),
  theme: themeEnum("theme").notNull(),
  ...timestamps,
});

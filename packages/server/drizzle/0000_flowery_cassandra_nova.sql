CREATE TYPE "public"."budget_category" AS ENUM('entertainment', 'bills', 'groceries', 'dining-out', 'transportation', 'personal-care', 'education', 'lifestyle', 'shopping', 'general');--> statement-breakpoint
CREATE TYPE "public"."theme" AS ENUM('green', 'yellow', 'cyan', 'navy', 'red', 'purple', 'pink', 'turquoise', 'brown', 'magenta', 'blue', 'navy-grey', 'army-green', 'gold', 'orange');--> statement-breakpoint
CREATE TYPE "public"."transaction_category" AS ENUM('income', 'pot', 'entertainment', 'bills', 'groceries', 'dining-out', 'transportation', 'personal-care', 'education', 'lifestyle', 'shopping', 'general');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'voided');--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"user_id" varchar(25) NOT NULL,
	"category" "budget_category" NOT NULL,
	"maximum_spend" numeric(10, 2) NOT NULL,
	"theme" "theme" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "budgets_category_unique" UNIQUE("category"),
	CONSTRAINT "budgets_theme_unique" UNIQUE("theme")
);
--> statement-breakpoint
CREATE TABLE "pots" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"name" varchar(30) NOT NULL,
	"user_id" varchar(25) NOT NULL,
	"target" numeric(10, 2) NOT NULL,
	"total_saved" numeric(10, 2) DEFAULT 0 NOT NULL,
	"theme" "theme" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "pots_name_unique" UNIQUE("name"),
	CONSTRAINT "pots_theme_unique" UNIQUE("theme")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"user_id" varchar(25) NOT NULL,
	"name" varchar(30) NOT NULL,
	"category" "transaction_category" NOT NULL,
	"transaction_date" date NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"is_recurring" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(25) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"email_verification_code" varchar(64),
	"email_verification_expiry" timestamp,
	"password_reset_token" varchar(64),
	"password_reset_expiry" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pots" ADD CONSTRAINT "pots_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
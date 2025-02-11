import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { transactions } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";

export const getRecurringBills = asyncHandler(
  async function getRecurringBills(request, response) {
    const recurringBills = await db
      .select({
        id: transactions.id,
        name: transactions.name,
        dueDate:
          sql`CONCAT('monthly-', EXTRACT(DAY FROM ${transactions.date}))`.as(
            "dueDate"
          ),
        amount: transactions.amount,
        status: sql`
          CASE
            WHEN EXTRACT(MONTH FROM ${transactions.date}) = EXTRACT(MONTH FROM NOW())
              THEN 'PAID'
            WHEN EXTRACT(DAY FROM ${transactions.date}) > EXTRACT(DAY FROM NOW()) + 7
              THEN 'UPCOMING'
            ELSE 'DUE_SOON'
          END
        `.as("status"),
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, request.user.id),
          eq(transactions.status, "active"),
          eq(transactions.isRecurring, true)
        )
      );

    return response.status(200).json(
      new ApiResponse({
        data: {
          transactions: recurringBills,
        },
        message: "Recurring bills retrieved successfully",
        status: "ok",
      })
    );
  }
);

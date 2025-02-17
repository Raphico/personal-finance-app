import { transactionSchema } from "@repo/shared-validators/transactions";
import { db } from "../../db/index.js";
import { transactions } from "../../db/schema.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { and, eq, sql } from "drizzle-orm";

export const addNewTransaction = asyncHandler(
  async function addNewTransaction(request, response) {
    const { data, error } = transactionSchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: error.errors[0]?.message,
        statusCode: 400,
      });
    }

    const { name, category, amount, date, isRecurring } = data;

    const transaction = await db.transaction(async (tx) => {
      const [transaction] = await tx
        .insert(transactions)
        .values({
          name,
          userId: request.user.id,
          category,
          amount: category == "income" ? amount : -amount,
          date,
          isRecurring,
        })
        .returning({
          id: transactions.id,
          name: transactions.name,
          date: transactions.date,
          amount: transactions.amount,
          category: transactions.category,
          isRecurring: transactions.isRecurring,
        });

      const [{ netBalance }] = await tx
        .select({
          netBalance: sql`COALESCE(SUM(${transactions.amount}), 0)`,
        })
        .from(transactions)
        .where(
          and(
            eq(transactions.userId, request.user.id),
            eq(transactions.status, "active")
          )
        );

      if (Number(netBalance) < 0) {
        throw new ApiError({
          message: "You don't have enough balance",
          statusCode: 400,
        });
      }

      return transaction;
    });

    response.status(201).json(
      new ApiResponse({
        data: transaction,
        message: "transaction added successfully",
        status: "ok",
      })
    );
  }
);

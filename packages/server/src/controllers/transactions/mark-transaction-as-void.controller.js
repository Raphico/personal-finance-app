import { asyncHandler } from "../../utils/async-handler.js";
import { db } from "../../db/index.js";
import { transactions } from "../../db/schema.js";
import { and, eq, sql } from "drizzle-orm";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";

export const markTransactionAsVoid = asyncHandler(
  async function markTransactionAsVoid(request, response) {
    const { id } = request.params;

    const transaction = await db.transaction(async (tx) => {
      const [transaction] = await tx
        .update(transactions)
        .set({
          status: "voided",
        })
        .where(
          and(eq(transactions.id, id), eq(request.user.id, transactions.userId))
        )
        .returning({
          id: transactions.id,
          status: transactions.status,
          category: transactions.category,
        });

      if (!transaction) {
        throw new ApiError({
          message: "Transaction not found",
          status: 404,
        });
      }

      if (transaction.category == "pot") {
        throw new ApiError({
          message: "You can't mark pot transaction has void",
          status: 400,
        });
      }

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

      if (netBalance < 0) {
        throw new ApiError({
          message:
            "Voiding this transaction would result in a negative balance",
          statusCode: 400,
        });
      }

      return transaction;
    });

    response.status(200).json(
      new ApiResponse({
        data: transaction,
        message: "transaction voided successfully",
        status: "ok",
      })
    );
  }
);

import { asyncHandler } from "../../utils/async-handler.js";
import { db } from "../../db/index.js";
import { transactions } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";

export const markTransactionAsVoid = asyncHandler(
  async function markTransactionAsVoid(request, response) {
    const { id } = request.params;

    const isTransactionPot = await db.query.transactions.findFirst({
      column: {
        id: true,
      },
      where: and(
        eq(transactions.id, id),
        eq(request.user.id, transactions.userId),
        eq(transactions.category, "pot")
      ),
    });

    if (isTransactionPot) {
      throw new ApiError({
        message: "You can't mark pot transaction has void",
        status: 400,
      });
    }

    const [transaction] = await db
      .update(transactions)
      .set({
        status: "voided",
      })
      .where(
        and(eq(transactions.id, id), eq(request.user.id, transactions.userId))
      )
      .returning({ id: transactions.id, status: transactions.status });

    if (!transaction) {
      throw new ApiError({
        message: "Transaction not found",
        status: 404,
      });
    }

    response.status(200).json(
      new ApiResponse({
        data: transaction,
        message: "transaction voided successfully",
        status: "ok",
      })
    );
  }
);

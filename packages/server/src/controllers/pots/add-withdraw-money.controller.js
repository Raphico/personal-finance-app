import { addWithdrawMoneySchema } from "@repo/shared-validators/pots";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { db } from "../../db/index.js";
import { pots, transactions } from "../../db/schema.js";
import { and, eq, sql } from "drizzle-orm";
import { ApiResponse } from "../../utils/api-response.js";
import { getCurrentDate } from "../../utils/helpers.js";

export const addWithdrawMoney = asyncHandler(
  async function addWithdrawMoney(request, response) {
    const { id } = request.params;
    const { error, data } = addWithdrawMoneySchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: error.errors[0]?.message,
        statusCode: 400,
      });
    }

    const { amount } = data;

    const updatedPot = await db.transaction(async (tx) => {
      // For deposits, check if the main balance covers the deposit
      if (amount > 0) {
        const [{ currentBalance }] = await tx
          .select({
            currentBalance: sql`SUM(${transactions.amount})`,
          })
          .from(transactions)
          .where(eq(transactions.userId, request.user.id));

        if (currentBalance < amount) {
          throw new ApiError({
            message: "You don't have enough balance to add to pot",
            statusCode: 400,
          });
        }
      }

      // Update the pot's totalSaved
      const [pot] = await tx
        .update(pots)
        .set({
          totalSaved: sql`${pots.totalSaved} + ${amount}`,
        })
        .where(and(eq(pots.userId, request.user.id), eq(pots.id, id)))
        .returning({
          id: pots.id,
          name: pots.name,
          totalSaved: pots.totalSaved,
          target: pots.target,
          theme: pots.theme,
        });

      if (!pot) {
        throw new ApiError({
          message: "Pot not found",
          statusCode: 404,
        });
      }

      // Ensure new totalSaved is within valid range
      if (
        Number(pot.totalSaved) < 0 ||
        Number(pot.totalSaved) > Number(pot.target)
      ) {
        throw new ApiError({
          message:
            amount > 0
              ? "Deposit exceeds target amount"
              : "You cannot withdraw more than the total saved",
          statusCode: 400,
        });
      }

      // Record the transaction for the pot operation
      const [newTransaction] = await tx
        .insert(transactions)
        .values({
          userId: request.user.id,
          name: pot.name,
          amount: -amount,
          date: getCurrentDate(),
          category: "pot",
        })
        .returning({ id: transactions.id });

      if (!newTransaction) {
        throw new ApiError({
          message: "Transaction recording failed",
          statusCode: 500,
        });
      }

      return pot;
    });

    response.status(200).json(
      new ApiResponse({
        data: updatedPot,
        message: "pot's total saved updated successfully",
        status: "ok",
      })
    );
  }
);

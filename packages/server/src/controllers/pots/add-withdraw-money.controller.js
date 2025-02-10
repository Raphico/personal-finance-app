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

    const pot = await db.transaction(async (tx) => {
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

      const [transaction] = await tx
        .insert(transactions)
        .values({
          userId: request.user.id,
          name: pot.name,
          amount: amount,
          date: getCurrentDate(),
          category: "pot",
        })
        .returning({ id: transactions.id });

      if (!transaction) {
        tx.rollback();
      }

      return pot;
    });

    response.status(200).json(
      new ApiResponse({
        data: pot,
        message: "pot's total saved updated successfully",
        status: "ok",
      })
    );
  }
);

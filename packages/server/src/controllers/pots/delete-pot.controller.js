import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { pots } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

export const deletePot = asyncHandler(
  async function deletePot(request, response) {
    const { id } = request.params;

    const [pot] = await db
      .delete(pots)
      .where(and(eq(pots.userId, request.user.id), eq(pots.id, id)))
      .returning({
        id: pots.id,
        name: pots.name,
        target: pots.target,
        theme: pots.theme,
      });

    if (!pot) {
      throw new ApiError({
        message: "pot not found",
        status: 404,
      });
    }

    response.status(200).json(
      new ApiResponse({
        data: pot,
        message: "pot deleted successfully",
        status: "ok",
      })
    );
  }
);

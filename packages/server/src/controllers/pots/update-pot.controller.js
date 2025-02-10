import { updatePotSchema } from "@repo/shared-validators/pots";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { db } from "../../db/index.js";
import { and, eq } from "drizzle-orm";
import { pots } from "../../db/schema.js";

export const updatePot = asyncHandler(
  async function updatePot(request, response) {
    const { id } = request.params;
    const { error, data } = updatePotSchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: error.errors[0]?.message,
        statusCode: 400,
      });
    }

    const { name, target, theme } = data;

    if (!name && !target && !theme) {
      throw new ApiError({
        message: "no data provided to update",
        statusCode: 400,
      });
    }

    try {
      const [pot] = await db
        .update(pots)
        .set({
          name: name ?? pots.name,
          target: target ?? pots.target,
          theme: theme ?? pots.theme,
        })
        .where(and(eq(pots.userId, request.user.id), eq(pots.id, id)))
        .returning({
          id: pots.id,
          name: pots.name,
          target: pots.target,
          totalSaved: pots.totalSaved,
          theme: pots.theme,
        });

      if (!pot) {
        throw new ApiError({
          message: "pot not found",
          statusCode: 404,
        });
      }

      response.status(200).json({
        data: pot,
        message: "pot updated successfully",
        status: "ok",
      });
    } catch (error) {
      if (error?.code == "23505") {
        throw new ApiError({
          message: "pot name or theme already in use",
          statusCode: 400,
        });
      }

      throw error;
    }
  }
);

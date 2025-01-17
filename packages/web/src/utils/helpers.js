import { AxiosError } from "axios";
import { z } from "zod";

export function getError(error) {
  if (error instanceof z.ZodError) {
    return error.errors.reduce((acc, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {});
  }

  if (error instanceof AxiosError) {
    return { general: error.response.data?.message };
  }
}

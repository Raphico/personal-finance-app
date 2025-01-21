import { AxiosError } from "axios";
import { z } from "@repo/shared-validators";

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

export function serializeParams(params = {}) {
  return Object.keys(params)
    .filter((key) => params[key])
    .map(function generateUrlParams(key) {
      return `${key}=${encodeURIComponent(params[key])}`;
    })
    .join("&");
}

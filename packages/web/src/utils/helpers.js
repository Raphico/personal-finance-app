import { AxiosError } from "axios";
import { z } from "@repo/shared-validators";
import { colors } from "@/constants";
import { customAlphabet } from "nanoid";

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

export function selectRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatCurrency(amount, currencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    signDisplay: "always",
  }).format(amount);
}
/**
 * Original source
 * https://github.com/sadmann7/skateshop/blob/main/src/lib/id.ts
 *
 * Generates a unique ID with a given prefix.
 * @param prefix The prefix to use for the generated ID.
 * @param options The options for generating the ID.
 * @example
 * generateId("store") => "str_abc123def456"
 * generateId("store", { length: 8 }) => "str_abc123d"
 * generateId("store", { separator: "-" }) => "str-abc123def456"
 */
export function generateId({ prefix, length = 12, separator = "-" } = {}) {
  const id = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();
  return prefix ? `${prefix}${separator}${id}` : id;
}

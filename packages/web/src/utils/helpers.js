import { AxiosError } from "axios";
import { z } from "@repo/shared-validators";
import { colors } from "@/constants";

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
  }).format(amount);
}

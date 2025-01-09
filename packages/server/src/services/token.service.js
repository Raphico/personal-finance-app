import crypto from "node:crypto";
import { VERIFICATION_EXPIRY } from "../config.js";

/**@description generates temporary codes for email verification. */
export function generateVerificationCode() {
  const unHashedCode = crypto.randomInt(100000, 999999).toString();
  const hashedCode = crypto
    .createHash("sha256")
    .update(unHashedCode)
    .digest("hex");

  const expiresAt = new Date(Date.now() + VERIFICATION_EXPIRY);

  return {
    unHashedCode,
    hashedCode,
    expiresAt,
  };
}

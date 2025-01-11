import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { env, VERIFICATION_EXPIRY } from "../config.js";

export function generateHash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

/**@description generates temporary codes for email verification. */
export function generateVerificationCode() {
  const unHashedCode = crypto.randomInt(100000, 999999).toString();
  const hashedCode = generateHash(unHashedCode);
  const expiresAt = new Date(Date.now() + VERIFICATION_EXPIRY);

  return {
    unHashedCode,
    hashedCode,
    expiresAt,
  };
}

/**@description generates temporary token for password resets. */
export function generateVerificationToken() {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = generateHash(unHashedToken);
  const expiresAt = new Date(Date.now() + VERIFICATION_EXPIRY);

  return {
    unHashedToken,
    hashedToken,
    expiresAt,
  };
}

export function generateAccessToken(payload) {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  });
}

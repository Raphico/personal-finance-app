import { Router } from "express";
import { signup } from "../controllers/auth/signup.controller.js";
import { verifyEmail } from "../controllers/auth/verify-email.controller.js";
import { resendEmailVerification } from "../controllers/auth/resend-email-verification.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { refreshToken } from "../controllers/auth/refresh-token.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { requestPasswordReset } from "../controllers/auth/request-password-reset.controller.js";
import { resetPassword } from "../controllers/auth/reset-password.controller.js";
import {
  moderateLimiter,
  strictLimiter,
} from "../middleware/rate-limit.middleware.js";

const router = Router();

router.use(moderateLimiter);

router.post("/signup", strictLimiter, signup);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);

router.post("/verification", verifyEmail);
router.post("/resend-verification", strictLimiter, resendEmailVerification);

router.post("/password-reset-requests", strictLimiter, requestPasswordReset);
router.patch("/password-resets/:token", resetPassword);

router.post("/refresh", refreshToken);

export default router;

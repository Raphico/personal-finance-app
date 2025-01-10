import { Router } from "express";
import { signup } from "../controllers/auth/signup.controller.js";
import { verifyEmail } from "../controllers/auth/verify-email.controller.js";
import { resendEmailVerification } from "../controllers/auth/resend-email-verification.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { refreshToken } from "../controllers/auth/refresh-token.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/verification", verifyEmail);
router.post("/resend-verification", resendEmailVerification);

router.post("/refresh", refreshToken);

export default router;

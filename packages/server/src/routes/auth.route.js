import { Router } from "express";
import { signup } from "../controllers/auth/signup.controller.js";
import { verifyEmail } from "../controllers/auth/verify-email.controller.js";

const router = Router();

router.post("/signup", signup);

router.post("/verification", verifyEmail);

export default router;

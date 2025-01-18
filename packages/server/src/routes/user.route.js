import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/user/get-current-user.controller.js";

const router = Router();

router.get("/", verifyJWT, getCurrentUser);

export default router;

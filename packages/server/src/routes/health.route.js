import { Router } from "express";
import { healthCheck } from "../controllers/health-check.controller.js";

const router = Router();

router.get("/", healthCheck);

export default router;

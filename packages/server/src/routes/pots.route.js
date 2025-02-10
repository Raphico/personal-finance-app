import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addNewPot } from "../controllers/pots/add-new-pot.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addNewPot);

export default router;

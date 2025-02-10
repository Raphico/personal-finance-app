import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addNewPot } from "../controllers/pots/add-new-pot.controller.js";
import { getCurrentUserPots } from "../controllers/pots/get-current-user-pots.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addNewPot).get(verifyJWT, getCurrentUserPots);

export default router;

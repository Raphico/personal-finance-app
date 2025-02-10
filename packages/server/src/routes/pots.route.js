import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addNewPot } from "../controllers/pots/add-new-pot.controller.js";
import { getCurrentUserPots } from "../controllers/pots/get-current-user-pots.controller.js";
import { deletePot } from "../controllers/pots/delete-pot.controller.js";
import { updatePot } from "../controllers/pots/update-pot.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addNewPot).get(verifyJWT, getCurrentUserPots);
router.route("/:id").delete(verifyJWT, deletePot).patch(verifyJWT, updatePot);

export default router;

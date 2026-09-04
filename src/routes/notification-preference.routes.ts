import { Router } from "express";
import { getPreferences, updatePreferences } from "../controllers/notification-preference.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, getPreferences);
router.patch("/", authenticate, updatePreferences);

export default router;
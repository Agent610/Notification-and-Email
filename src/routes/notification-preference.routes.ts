import { Router } from "express";
import { getPreferences, updatePreferences } from "../controllers/notification-preference.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateNotificationPreferenceRequest } from "../middleware/validation.middleware";

const router = Router();

router.get("/", authenticate, getPreferences);
router.patch("/", authenticate, validateNotificationPreferenceRequest, updatePreferences);

export default router;
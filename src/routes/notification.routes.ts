import { Router } from "express";
import {create, getNotifications, markAsRead} from "../controllers/notification.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getNotifications);
router.patch("/:notificationId/read", authenticate, markAsRead);

export default router;
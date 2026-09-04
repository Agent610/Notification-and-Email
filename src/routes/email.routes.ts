import { Router } from "express";
import { sendEmail } from "../controllers/email.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateEmailRequest } from "../middleware/validation.middleware";

const router = Router();

router.post("/send", authenticate, validateEmailRequest, sendEmail);

export default router;
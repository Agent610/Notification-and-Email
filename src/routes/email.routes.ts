import { Router } from "express";
import { sendEmail } from "../controllers/email.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validationEmailRequest } from "../middleware/validation.middleware";

const router = Router();

router.post("/send", authenticate, validationEmailRequest, sendEmail);

export default router;
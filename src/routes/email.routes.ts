import { Router } from "express";
import { sendEmail } from "../controllers/email.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/send", sendEmail, authenticate);

export default router;
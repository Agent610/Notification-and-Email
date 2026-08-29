import { Router } from "express";
import {login, register} from "../controllers/auth.controller";
import { validateAuthRequest } from "../middleware/validation.middleware";

const router = Router();

router.post("/register", validateAuthRequest, register);
router.post("/login", validateAuthRequest, login);

export default router;
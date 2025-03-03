import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import validate from "../middleware/validation.middleware";
import { signupSchema } from "../validations/user.validation";
import { loginSchema } from "../validations/auth.validation";

const router = Router()
router.post("/signup",validate(signupSchema), signup)
router.post("/login",validate(loginSchema), login)

export default router
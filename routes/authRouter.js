import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validtateLoginInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/login", validtateLoginInput, login);
router.post("/register", validateRegisterInput, register);
router.get("/logout", logout);

export default router;

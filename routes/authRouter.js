import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import rateLimiter from "express-rate-limit";
import {
  validateRegisterInput,
  validtateLoginInput,
} from "../middleware/validationMiddleware.js";
import { RATE_LIMITER } from "../utils/constants.js";

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: RATE_LIMITER.TIMEOUT,
  max: RATE_LIMITER.MAX_REQUESTS,
  message: { message: RATE_LIMITER.MESSAGE },
});

router.post("/login", apiLimiter, validtateLoginInput, login);
router.post("/register", apiLimiter, validateRegisterInput, register);
router.get("/logout", logout);

export default router;

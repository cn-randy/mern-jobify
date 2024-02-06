import { Router } from "express";
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizedPermissions } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
import { checkForTestUser } from "../.docs/mern-jobify-v2-main/mern-jobify-v2-main/middleware/authMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizedPermissions("admin"),
  getApplicationStats,
]);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser,
);

export default router;

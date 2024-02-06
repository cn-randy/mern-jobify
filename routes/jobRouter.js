import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  updateJob,
  createJob,
  deleteJobById,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../.docs/mern-jobify-v2-main/mern-jobify-v2-main/middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJobById)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJobById);

export default router;

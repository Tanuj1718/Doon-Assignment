import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { EnrollInCourse } from "../controllers/crud.controllers.js";

const router = Router()
router.route('/users/enroll/:courseId').post(authenticate, EnrollInCourse)
export default router
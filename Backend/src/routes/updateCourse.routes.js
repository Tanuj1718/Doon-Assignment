import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { UpdateCourse } from "../controllers/crud.controllers.js";

const router = Router()
router.route('/admin/courses/:id').put(authenticate, authorize('admin'), UpdateCourse)
export default router
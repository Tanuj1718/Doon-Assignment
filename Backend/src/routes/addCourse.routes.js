import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { AddCourse } from "../controllers/crud.controllers.js";

const router = Router()
router.route('/admin/courses').post(authenticate, authorize('admin'), AddCourse)
export default router
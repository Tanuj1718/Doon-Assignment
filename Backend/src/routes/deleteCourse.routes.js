import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { DeleteCourse } from "../controllers/crud.controllers.js";

const router = Router();
router
  .route('/admin/courses/:id')
  .delete(authenticate, authorize('admin'), DeleteCourse);
export default router;

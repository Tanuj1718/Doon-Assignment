import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { GetCourse } from "../controllers/crud.controllers.js";

const router = Router()
router.route('/courses').get(authenticate, GetCourse)
export default router
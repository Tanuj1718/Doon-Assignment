import { Router } from "express";
import {Signin} from "../controllers/auth.controllers.js";

const router = Router()
router.route('/signin').post(Signin)
export default router
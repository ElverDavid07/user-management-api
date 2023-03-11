import { Router } from "express";
import { userLogin, registerUser } from "../controllers/user.controller";
import { defaultRole } from "../middlewares/roleDefault";
import {userValidator} from '../validators/user.validator'

const router = Router();

router.post("/register",userValidator,defaultRole, registerUser);
router.post("/login",userLogin)

export default router;

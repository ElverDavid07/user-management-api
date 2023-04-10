import { Router } from "express";
import { userLoginController, registerUserController, logoutController } from "../controllers/user.controller";
import { defaultRole } from "../middlewares/roleDefault";
import { checkSession } from "../middlewares/session";
import {userValidator} from '../validators/user.validator'

const router = Router();

router.post("/register",userValidator,defaultRole, registerUserController);
router.post("/login",userLoginController)
router.post("/logout",checkSession,logoutController)

export default router;

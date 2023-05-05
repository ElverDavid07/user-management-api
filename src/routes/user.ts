import { Router } from "express";
import { getUserController, getUsersController, userUpdateController } from "../controllers/user.controller";
import { ProtectRutesRole } from "../middlewares/ProtectRoutesRole";

import { checkSession } from "../middlewares/session";

const router = Router();

router.get("/users", checkSession,ProtectRutesRole, getUsersController);
router.get("/user/:id", getUserController);
router.put("/user/:id",checkSession,userUpdateController)

export default router;

import { Router } from "express";
import { getUser, getUsers, userUpdate } from "../controllers/user.controller";

import { checkSession } from "../middlewares/session";

const router = Router();

router.get("/users", checkSession, getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id",userUpdate)

export default router;

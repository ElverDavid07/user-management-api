import { Router } from "express";
import { getRole, getRoles, newRole, roleUpdate } from "../controllers/role.controller";
import { checkSession } from "../middlewares/session";

const router = Router();

router.get("/roles",checkSession,getRoles)
router.get("/roles/:id",checkSession,getRole)
router.post("/roles",checkSession, newRole);
router.put("/roles/:id",checkSession,roleUpdate)

export default router;

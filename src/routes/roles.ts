import { Router } from "express";
import { getRole, getRoles, newRole, roleUpdate } from "../controllers/role.controller";

const router = Router();

router.get("/roles",getRoles)
router.get("/roles/:id",getRole)
router.post("/roles", newRole);
router.put("/roles/:id",roleUpdate)

export default router;

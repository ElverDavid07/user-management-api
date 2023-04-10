import { Router } from "express";
import { delateInfoEmbarque, getAllInfoUser, getInfoEmbarque, getInfoEmbarques, postInfoEmbarques, putInfoEmbarque } from "../controllers/infoEmbarques.controller";
import { middlewareInfo } from "../middlewares/infoEmbarque.middleware";
import { checkSession } from "../middlewares/session";

const router = Router();

router.get("/info-embarques",checkSession,getInfoEmbarques);
router.get("/info-embarque/:id",checkSession,getInfoEmbarque);
router.get("/user/:id/info-embarques",checkSession,getAllInfoUser)
router.post("/info-embarques",checkSession,middlewareInfo,postInfoEmbarques);
router.put("/info-embarques/:id",checkSession,putInfoEmbarque);
router.delete("/info-embarques/:id",checkSession,delateInfoEmbarque);

export default router;

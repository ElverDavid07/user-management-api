import { RequestHandler } from "express";
import { userModel } from "../models/user.model";
import { rolesModel } from "../models/role.model";
import { verifyToken } from "../jwt/jdwHandle";
import { JwtPayload } from "jsonwebtoken";

/* variable */
const admin = "admin"


const ProtectRutesRole: RequestHandler = async ({ headers }, res, next) => {
 try {
  const authHeader = headers.authorization || "";
  const token = authHeader.split(" ").pop();
  const isUser = (await verifyToken(`${token}`)) as JwtPayload;
  const email = isUser?.email ?? "Token no válido";

  const user = await userModel.findOne({ email }).populate("role");
  if (!user) {
   res.status(401);
   res.json({ message: "Usuario no autorizado." });
   return;
  }

  const checkRole = await rolesModel.findById(user.role);
  if (!checkRole || checkRole.role !== admin) {
   res.status(403);
   res.json({ message: "No tiene autorización para acceder a esta ruta." });
   return;
  }
  next();
 } catch (error) {
  console.log(error);
  res.status(500);
  res.json({ message: "Error interno del servidor." });
 }
};

export { ProtectRutesRole };

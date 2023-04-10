import { RequestHandler } from "express";
import { userModel } from "../models/user.model";
import { rolesModel } from "../models/role.model";
const ProtectRutesRole: RequestHandler = async ({ body }, res, next) => {
 try {
  const { email } = body;
  const checkIs = await userModel.findOne({ email }).populate("role");
  if (!checkIs) {
   return { message: "el usuario no existe" };
  }
  const checkRole = await rolesModel.findById(checkIs.role);
  console.log(checkRole);
  // console.log(checkIs)
  if (!checkRole || checkRole.role !== "admin") {
   res.status(409);
   res.json({ message: "No tiene autorización para acceder a esta ruta." });
  }
  next();
 } catch (error) {
  res.status(500);
  res.json("error");
  console.log(error)
 }
};

export { ProtectRutesRole };

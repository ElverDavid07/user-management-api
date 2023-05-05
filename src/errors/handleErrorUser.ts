import { Response } from "express";
import { User } from "../interfaces/user.interface";
import { ResponseType } from "../interfaces/Response.interface";

//*manejador de errores para la funcion de  login
const handleLoginResponse = (res: Response, response: ResponseType) => {
 if (typeof response !== "string") {
  const { cookie, message, userId } = response;
  res.setHeader("Set-Cookie", cookie);
  res.json({ message, userId });
 } else if (response === "EL_USUARIO_NO_A_SIDO_REGISTRADO!") {
  res.status(404);
  res.json(response);
 } else if (
  response === "CONTRASEÑA_ENCRYPTADA_NO_EXISTE" ||
  response === "CONTRASEÑA_INCORRECTA!"
 ) {
  res.status(403);
  res.json(response);
 }
};

//*manejador de errores para la funcion de register
const handleRegisterResponse = (res: Response, response: ResponseType) => {
 if (typeof response !== "string") {
  const { cookie, message, userId } = response;
  res.setHeader("Set-Cookie", cookie);
  res.json({ message, userId });
 } else if (response === "El usuario ya existe!") {
  res.status(409);
  res.json(response);
 }
};
//*manejador de errores para la funcion de getOneUser
const handleErrorGetUser = (res: Response, response: User | null) => {
 if (response) {
  res.json(response);
 } else {
  res.status(404);
  res.json("Usuario no encontrado!");
 }
};

//*manejador de errores para la funcion de updateUser
const handleErrorUpdate = (password: string, res: Response, response: User | null) => {
 if (!response) {
  res.status(404);
  res.json("Este usuario no se puede actualizar porque no existe!");
 }

 if (password) {
  res.status(409);
  res.json("No se puede actualizar la contraseña!");
 } else {
  res.json(response);
 }
};
export { handleLoginResponse, handleRegisterResponse, handleErrorGetUser, handleErrorUpdate };

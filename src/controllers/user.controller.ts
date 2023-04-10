import { serialize } from "cookie";
import { Request, Response } from "express";
import {optionCookieLogout } from "../config/optionCookie";
import {
 handleErrorGetUser,
 handleErrorUpdate,
 handleLoginResponse,
 handleRegisterResponse,
} from "../errors/handleErrorUser";
import { httpError } from "../errors/httpError";
import {
 getAllusers,
 getUserById,
 loginUser,
 registerNewUser,
 updateUser,
} from "../services/user.services";

//* -----get-----
const getUsersController = async ({ query,body }: Request, res: Response) => {
 try {
  //configuracion o opciones por defecto  de modulo de paginacion
  const { page = 1, limit = 25 } = query;

  const option = {
   page: parseInt(page.toString(), 10),
   limit: parseInt(limit.toString(), 10),
   sort: { createdAt: "desc" },
   populate: { path: "role" },
   select: "-password",
  };
  const response = await getAllusers(option,body);
  res.json(response);
 } catch (error) {
  httpError(res, "ERROR_GET_USERS", error);
 }
};

//* -----get-----
const getUserController = async ({ params }: Request, res: Response) => {
 try {
  const { id } = params;
  const response = await getUserById(id);
  //manejador de errores
  handleErrorGetUser(res, response);
 } catch (error) {
  httpError(res, "ERROR_GET_USER", error);
 }
};

//* -----post register-----
const registerUserController = async ({ body }: Request, res: Response) => {
 try {
  const response = await registerNewUser(body);
  //manejador de errores
  handleRegisterResponse(res, response);
 } catch (error) {
  httpError(res, "ERROR_REGISTER_NEW_USER", error);
 }
};
//* -----post login-----
const userLoginController = async ({ body }: Request, res: Response) => {
 try {
  const { email, password } = body;
  const response = await loginUser({ email, password });

  console.log(response);
  //manejador de errores
  handleLoginResponse(res, response);
 } catch (error) {
  httpError(res, "ERROR_LOGIN_USER", error);
 }
};
//* ------post logout---------
const logoutController = async(req: Request, res: Response) =>{
    try {
       const Cookie = serialize("token","",optionCookieLogout)
       res.setHeader("Set-Cookie",Cookie)
       res.json({message:"logout successfuly"})
    } catch (error) {
        httpError(res, "ERROR_LOGOUT", error);
    }
}

//* -----put-----
const userUpdateController = async ({ params, body }: Request, res: Response) => {
 try {
  const { id } = params;
  const password = body.password;
  const response = await updateUser(id, body);
  //manejador de errores
  handleErrorUpdate(password, res, response);
 } catch (error) {
  httpError(res, "ERROR_UPDATE_USER", error);
 }
};
export {
 getUsersController,
 getUserController,
 registerUserController,
 userLoginController,
 userUpdateController,
 logoutController
};

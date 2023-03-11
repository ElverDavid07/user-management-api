import { Request, Response } from "express";
import { User } from "../interfaces/user.interface";

type Resp = string | object;

//login
const handleLoginResponse = (res: Response, response: Resp) => {
  if (response === "EL_USUARIO_NO_A_SIDO_REGISTRADO!") {
    res.status(404);
    return res.json(response);
  }

  if (response === "CONTRASEÑA_ENCRYPTADA_NO_EXISTE") {
    res.status(404);
    return res.json(response);
  }

  if (response === "CONTRASEÑA_INCORRECTA!") {
    res.status(403);
    return res.json(response);
  }

  return res.json(response);
};

//register
const handleRegisterResponse = (res: Response, response: Resp) => {
  if (response === "EL_USUARIO_YA_EXISTE!") {
    res.status(409);
    res.json(response);
  } else {
    res.json(response);
  }
};
//getOneUser
const handleErrorGetUser = (res: Response, response: User | null) => {
  if (response) {
    res.json(response);
  } else {
    res.status(404);
    res.json("USUARIO_NO_ENCONTRADO!");
  }
};

//updateUser
const handleErrorUpdate = (
  password: string,
  res: Response,
  response: User | null
) => {
  if (!response) {
    res.status(404);
    res.json("ESTE_USUARIO_NO_SE_PUEDE_ACTUALIZAR_PORQUE_NO_EXISTE!");
  }

  if (password) {
    res.status(500);
    res.json("NO_SE_PUEDE_ACTUALIZAR_LA_CONTRASEÑA");
  } else {
    res.json(response);
  }
};
export {
  handleLoginResponse,
  handleRegisterResponse,
  handleErrorGetUser,
  handleErrorUpdate,
};

import { RequestHandler } from "express";

//? RequestHandler es una interfaz de express que sabe que esto es un midleware por lo tanto no es nesesario tipar los paramentro (req,res,next)
//si el role es null o indefinido se le pondra el role de usuario por defecto
const defaultRole: RequestHandler = ({ body }, res, next) => {
  const userRole = process.env.DEFAULT_ROLE;
  body.role = body.role ?? userRole;
  next();
};

export { defaultRole };

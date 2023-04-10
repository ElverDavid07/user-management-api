import { RequestHandler } from "express";
import { verifyToken } from "../jwt/jdwHandle";

const checkSession: RequestHandler = async (req, res, next) => {
 try {
  const jwtUser = req.headers.authorization || "";
  const jwt = jwtUser.split(" ").pop();
  const isUser = await verifyToken(`${jwt}`);

  if (!isUser) {
   res.status(401);
   res.json("NO_TIENES_UN_JWT_VALIDO");
  } else {
   next();
  }
 } catch (error) {
  console.log(error);
  res.status(401);
  res.json("SESSION_NO_VALIDA");
 }
};
export { checkSession };

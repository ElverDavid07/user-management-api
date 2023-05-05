import { sign, verify } from "jsonwebtoken";
import {Types} from 'mongoose'
const JWT_SECRET = <string>process.env.JWT_SECRET;
const generateToken = async (id:Types.ObjectId ) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return jwt;
};

const verifyToken = async (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

export { generateToken, verifyToken };

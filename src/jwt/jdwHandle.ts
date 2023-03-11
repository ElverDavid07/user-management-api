import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = <string>process.env.JWT_SECRET;
const generateToken = async (email: string) => {
  const jwt = sign({ email }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return jwt;
};

const verifyToken = async (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

export { generateToken, verifyToken };

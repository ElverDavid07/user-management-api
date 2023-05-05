import { encryptPassword, comparePassword } from "../auth/encryptPassword";
import NodeCache from "node-cache";
import { userModel } from "../models/user.model";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { generateToken } from "../jwt/jdwHandle";
import { optionCookie } from "../config/optionCookie";
import { serialize } from "cookie";
import { getFromCache, setToCache } from "../cache/handleCache";

const cacheKey = "users";

//* -----obtener todos los usuarios-----
const getAllusers = async (option: object) => {
 //add cache
 const CacheUsers = getFromCache(cacheKey);
 if (CacheUsers) {
  return CacheUsers;
 } else {
  const UserList = await userModel.paginate({}, option);
  setToCache(cacheKey, UserList);
  return UserList;
 }
};

//* -----obtener solo un usuario-----
const getUserById = async (id: string) => {
 const response = await userModel.findById(id, { password: 0 }).populate("role");
 return response;
};

//* -----registrar un nuevo usuario, con la contraseña encryptada-----
const registerNewUser = async ({ email, password, name, state, role }: User) => {
 const userExists = await userModel.findOne({ email });
 if (userExists) return "El usuario ya existe!";

 const passwordEncrypt = await encryptPassword(password);
 const response = userModel.create({
  email,
  password: passwordEncrypt,
  name,
  state,
  role,
 });

 const token = await generateToken((await response)._id);
 const cookie = serialize("token", token, optionCookie);
 const allGood = {
  message: "Cuenta creada correctamente",
  userId: (await response)._id,
  cookie,
 };

 return allGood;
};

//* -----comparar si la contraseña es correcta para poder iniciar sesion-----
const loginUser = async ({ email, password }: Auth) => {
 const userExists = await userModel.findOne({ email });
 if (!userExists) return "EL_USUARIO_NO_A_SIDO_REGISTRADO!";

 const PasswordEncrypt = userExists?.password;
 if (!PasswordEncrypt) return "CONTRASEÑA_ENCRYPTADA_NO_EXISTE";

 const passwordCompare = await comparePassword(password, PasswordEncrypt);
 if (!passwordCompare) return "CONTRASEÑA_INCORRECTA!";
 const token = await generateToken(userExists._id);
 const cookie = serialize("token", token, optionCookie);
 const data = {
  message: "login successfuly",
  userId: userExists._id,
  cookie,
 };

 return data;
};
//* -----actualizar user-----
const updateUser = async (id: string, userUpdate: User) => {
 const response = await userModel.findOneAndUpdate({ _id: id }, userUpdate, {
  new: true,
 });

 return response;
};

export { getAllusers, getUserById, registerNewUser, loginUser, updateUser };

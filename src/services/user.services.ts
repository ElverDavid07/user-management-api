import { encryptPassword, comparePassword } from "../auth/encryptPassword";
import NodeCache from "node-cache";
import { userModel } from "../models/user.model";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { generateToken } from "../jwt/jdwHandle";
import { yellow, whiteBright } from "console-log-colors";
import { rolesModel } from "../models/role.model";

//*cache agregado a la ruta de obtener todo los usuarios para optimizar el tiempo de respuesta
const cache = new NodeCache({ stdTTL: 60 });
const cacheKey = "users";

//* -----obtener todos los usuarios-----
const getAllusers = async (option: object,user:User) => {

 const response = await userModel.paginate({}, option);
 //add cache
 const cacheUsers = cache.get(cacheKey);
 if (cacheUsers) {
  console.log(
   `${yellow.bold("CACHE")} - infomacion de usuarios retornada desde ${whiteBright.bold("CACHE")} `
  );
  return cacheUsers;
 } else {
  cache.set(cacheKey, response);
  console.log(
   `${yellow.bold("DB")} - infomacion de usuarios retornada desde la ${whiteBright.bold("DB")}`
  );
  return response;
 }
};

//* -----obtener solo un usuario-----
const getUserById = async (id: string) => {
 const response = await userModel.findById(id, { password: 0 }).populate("role");
 return response;
};

//* -----registrar un nuevo usuario, con la contraseña encryptada-----
const registerNewUser = async ({ email, password, name, state, role }: User) => {
 const checkIs = await userModel.findOne({ email });
 if (checkIs) return "El usuario ya existe!";

 const passwordEncrypt = await encryptPassword(password);
 const response = userModel.create({
  email,
  password: passwordEncrypt,
  name,
  state,
  role,
 });

 const token = await generateToken((await response).email);

 const allGood = {
  message: "Cuenta creada correctamente",
  userId: (await response)._id,
  token,
 };

 return allGood;
};

//* -----comparar si la contraseña es correcta para poder iniciar sesion-----
const loginUser = async ({ email, password }: Auth) => {
 const checkIs = await userModel.findOne({ email });
 if (!checkIs) return "EL_USUARIO_NO_A_SIDO_REGISTRADO!";

 const PasswordEncrypt = checkIs?.password;
 if (!PasswordEncrypt) return "CONTRASEÑA_ENCRYPTADA_NO_EXISTE";

 const passwordCompare = await comparePassword(password, PasswordEncrypt);
 if (!passwordCompare) return "CONTRASEÑA_INCORRECTA!";
 const token = await generateToken(checkIs.email);

 const data = {
  token,
  message: "login successfuly",
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

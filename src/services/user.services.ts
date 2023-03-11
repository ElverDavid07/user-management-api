import { encryptPassword, comparePassword } from "../auth/encryptPassword";
import NodeCache from "node-cache";
import { userModel } from "../models/user.model";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { generateToken } from "../jwt/jdwHandle";

//*cache agregado a la ruta de obtener todo los usuarios para optimizar el tiempo de respuesta
const cache = new NodeCache({ stdTTL: 60 });
const cacheKey = "users";

//* -----obtener todos los usuarios-----
const getAllusers = async (option: object) => {
  const response = await userModel.paginate({}, option);
  //add cache
  const cacheUsers = cache.get(cacheKey);
  if (cacheUsers) {
    console.log("infomacion retornada desde cache");
    return cacheUsers;
  } else {
    cache.set(cacheKey, response);
    console.log("infomacion retornada desde la base de datos");
    return response;
  }
};

//* -----obtener solo un usuario-----
const getUserById = async (id: string) => {
  const response = await userModel.findById(id);
  return response;
};

//* -----registrar un nuevo usuario, con la contraseña encryptada-----
const registerNewUser = async ({
  email,
  password,
  name,
  state,
  role,
}: User) => {
  const checkIs = await userModel.findOne({ email });
  if (checkIs) return "EL_USUARIO_YA_EXISTE!";

  const passwordEncrypt = await encryptPassword(password);
  const response = userModel.create({
    email,
    password: passwordEncrypt,
    name,
    state,
    role,
  });
  return response;
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
    user: checkIs,
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

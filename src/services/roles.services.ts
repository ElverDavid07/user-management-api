import { Roles } from "../interfaces/role";
import { rolesModel } from "../models/role.model";

//*obtener todos los roles creados

const getAllRoles = async () => {
  const response = await rolesModel.find();
  return response;
};

//*obtener solo un role por el id
const getRoleById = async (id: string) => {
  const response = await rolesModel.findById(id);
  return response;
};

//*crear un nuevo role
const createNewRole = async (role: Roles) => {
  const response = await rolesModel.create(role);
  return response;
};

//*actualizar role
const updateRole = async (id: string, roleUpdate: Roles) => {
  const response = await rolesModel.findOneAndUpdate({ _id: id }, roleUpdate, {
    new: true,
  });
  return response;
};
//*eliminar role

export { getAllRoles, createNewRole, getRoleById, updateRole };

import { Request, Response } from "express";
import {
  createNewRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../services/roles.services";
import { httpError } from "../errors/httpError";
import { handleErrorGetRole } from "../errors/handleErrorRole";

//?get
const getRoles = async (req: Request, res: Response) => {
  try {
    const response = await getAllRoles();
    res.json(response);
  } catch (error) {
    httpError(res, "ERROR_GET_ROLES", error);
  }
};
//?get
const getRole = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getRoleById(id);
    //manejador de errores
    handleErrorGetRole(res, response);
  } catch (error) {
    httpError(res, "ERROR_GET_ROLE", error);
  }
};
//?post
const newRole = async ({ body }: Request, res: Response) => {
  try {
    const response = await createNewRole(body);
    res.json(response);
  } catch (error) {
    httpError(res, "ERROR_CREATE_ROLES", error);
  }
};

//?put
const roleUpdate = async ({ body, params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await updateRole(id, body);
    res.json(response);
  } catch (error) {
    httpError(res, "ERROR_UPDATE_ROLES", error);
  }
};

export { newRole, getRoles, getRole, roleUpdate };

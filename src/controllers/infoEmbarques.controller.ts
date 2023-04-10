import { Request, Response } from "express";
import { httpError } from "../errors/httpError";
import {
 delateInfoEmbarques,
 getAllInfoEmbarque,
 getAllInfoEmbarques,
 getoneInfoEmbarque,
 saveInfoEmbarques,
 updateInfoEmbarques,
} from "../services/infoEmbarques.services";

//get
const getInfoEmbarques = async (req: Request, res: Response) => {
 try {
  const response = await getAllInfoEmbarques();
  res.json(response);
 } catch (error) {
  httpError(res, "Error get info embarques", error);
 }
};

const getInfoEmbarque = async ({ params }: Request, res: Response) => {
 try {
  const { id } = params;
  const response = await getoneInfoEmbarque(id);
  res.json(response);
 } catch (error) {
  httpError(res, "Error get info embarque", error);
 }
};

const getAllInfoUser = async({params}:Request,res:Response) =>{
    try {
        const {id} = params;
        const response = await getAllInfoEmbarque(id)
        res.json(response)
    } catch (error) {
        httpError( res,"error get all info embarques",error)
    }
}

const postInfoEmbarques = async ({ body }: Request, res: Response) => {
 try {
  const response = await saveInfoEmbarques(body);
  res.json(response);
 } catch (error) {
  httpError(res, "Error save info embarques", error);
 }
};

const putInfoEmbarque = async ({ params, body }: Request, res: Response) => {
 try {
  const { id } = params;
  const response = await updateInfoEmbarques(id, body);
  res.json(response);
 } catch (error) {
  httpError(res, "Error update info embarques", error);
 }
};

const delateInfoEmbarque = async ({ params }: Request, res: Response) => {
 try {
  const { id } = params;
  const response = await delateInfoEmbarques(id);
  return response;
 } catch (error) {}
};

export {
 getInfoEmbarques,
 getInfoEmbarque,
 postInfoEmbarques,
 putInfoEmbarque,
 delateInfoEmbarque,
 getAllInfoUser
};

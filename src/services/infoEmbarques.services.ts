import { Embarque } from "../interfaces/infoEmbarques.interface";
import { modelInfoEmbarques } from "../models/infoEmbarques.model";

//* ----- obtener todos la infomacion de los embarques de todos los usuarios ------
const getAllInfoEmbarques = async () => {
 const response = await modelInfoEmbarques.find().populate("user");
 return response;
};

const getoneInfoEmbarque = async (id: string) => {
 const response = await modelInfoEmbarques.findById(id);
 return response;
};

const saveInfoEmbarques = async (data: Embarque) => {
 const response = await modelInfoEmbarques.create(data);
 return response;
};

const updateInfoEmbarques = async (id: string, dataUpdate: Embarque) => {
 const response = await modelInfoEmbarques.findOneAndUpdate({ _id: id }, dataUpdate, { new: true });
 return response;
};

const delateInfoEmbarques = async (id: string) => {
 const response = await modelInfoEmbarques.deleteOne({ _id: id });
 return response;
};
const getAllInfoEmbarque = (id:string) =>{
    const response = modelInfoEmbarques.find({user:id}).populate({path:"user",select:"-password",populate:{path:"role"}})
    return response;
} 

export {
 getAllInfoEmbarques,
 getAllInfoEmbarque,
 getoneInfoEmbarque,
 saveInfoEmbarques,
 updateInfoEmbarques,
 delateInfoEmbarques,
};

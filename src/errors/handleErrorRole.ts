import { Response } from "express";
import { Roles } from "../interfaces/role";

const handleErrorGetRole = (res: Response, response:Roles | null) =>{
if(response){
    res.json(response)
}else{
    res.status(404)
    res.json("EL_ROLE_NO_EXISTE!")
}
}

export {handleErrorGetRole}
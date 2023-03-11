import { Response } from "express"

const httpError = (res:Response,errorMessage:string,error:any) =>{
console.log(error)
res.status(500)
res.json(errorMessage)
}

export {httpError}
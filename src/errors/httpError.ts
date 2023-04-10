import { Response } from "express"
import {red} from 'console-log-colors'

const httpError = (res:Response,errorMessage:string,error:any) =>{
console.log(red(error))
res.status(500)
res.json(errorMessage)
}

export {httpError}
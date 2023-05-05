import { Response } from "express"
import {red} from 'console-log-colors'

const httpError = (res:Response,errorMessage:string,error:any) =>{
console.log(red(`${red("causa de el error")} ${error}`))
res.status(500)
res.json(errorMessage)
}

export {httpError}
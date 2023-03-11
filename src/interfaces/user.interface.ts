import { Types } from "mongoose";
import { Auth } from "./auth.interface";


export interface User extends Auth,Document{
  name:string,
  state:"active" | "inactive"
  role:Types.ObjectId 
}
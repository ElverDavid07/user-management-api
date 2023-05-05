import { Types } from "mongoose";

interface DataResponse {
 message: string;
 userId: Types.ObjectId;
 cookie: string;
}

export type ResponseType = DataResponse | string;

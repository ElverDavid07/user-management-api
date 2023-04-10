import { Types } from "mongoose";

export interface Embarque {
 user: Types.ObjectId;
 semana: number;
 pedido: number;
 cajasEnviadas: number;
 cajasResividas?: number;
 cajasRechazadas?: number;
 precioEnDolar: number;
 precioEnPesos: number;
 dineroTotalEnDolar?: number;
 dineroTotalEnPesos?: number;
 motivoDelRechazo?: string;
}

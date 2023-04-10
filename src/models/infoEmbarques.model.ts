import mongoose, { Schema, model } from "mongoose";
import { Embarque } from "../interfaces/infoEmbarques.interface";


const schemaInfoEmbarques = new Schema<Embarque>(
  {
    user:[
      {type:Schema.Types.ObjectId,
      ref:"users"}
    ],
    semana: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
    },
    pedido: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
    },
    cajasEnviadas: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
    },
    cajasRechazadas: {
      type: Number,
      required: true,
      default:0,
      trim: true,
      lowercase: true,
    },
    cajasResividas: {
      type: Number,
      trim: true,
      lowercase: true,
    },
    precioEnDolar: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
    },
    precioEnPesos: {
      type:Number,
      required: true,
    },
    dineroTotalEnDolar: {
      type: Number,
      trim: true,
      lowercase: true,
    },
    dineroTotalEnPesos: {
      type: Number,
      trim: true,
      lowercase: true,
    },
    motivoDelRechazo: {
      type: String,
      trim: true,
      lowercase: true,
    }
  },
  { versionKey: false,timestamps:true }
);

const modelInfoEmbarques = model("infoEmbarques", schemaInfoEmbarques);

export { modelInfoEmbarques };

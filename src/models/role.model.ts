import { Schema, model } from "mongoose";
import { Roles } from "../interfaces/role";

const rolesSchema = new Schema<Roles>(
  {
    role: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
      default:"sin descripcion"
    },
  },
  { versionKey: false }
);

const rolesModel = model("roles", rolesSchema);

export { rolesModel };

import { Schema, model, PaginateModel } from "mongoose";
import { User } from "../interfaces/user.interface";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    state: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      trim: true,
      lowercase: true,
    },
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: "roles",
      },
      
    ],
  },
  { versionKey: false, timestamps: true }
);
userSchema.plugin(mongoosePaginate);

interface UserDocument extends User, Document {}

type userModel = PaginateModel<UserDocument>;
const userModel: userModel = model<UserDocument, userModel>(
  "users",
  userSchema
);

export { userModel };

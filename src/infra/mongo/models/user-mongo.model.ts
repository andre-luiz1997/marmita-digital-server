import type { User } from "@/domain/entities/user";
import mongoose from "mongoose";


export const UserMongoModel = new mongoose.Schema<User>({
  _id: mongoose.Types.ObjectId,
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true, select: false},
},{
  timestamps: true,
})
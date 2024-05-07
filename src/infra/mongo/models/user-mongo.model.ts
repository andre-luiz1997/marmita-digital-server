import { UserEntity } from "@/core/domain/entities";
import mongoose from "mongoose";


export const UserMongoModel = new mongoose.Schema<UserEntity>({
  _id: mongoose.Types.ObjectId,
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  group: {type: mongoose.Types.ObjectId, ref: 'Group', required: true},
},{
  timestamps: true,
})
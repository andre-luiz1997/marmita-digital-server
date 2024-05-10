import { GroupEntity } from "@/core/domain/entities";
import mongoose from "mongoose";

export const GroupMongoModel = new mongoose.Schema<GroupEntity>({
  _id: mongoose.Types.ObjectId,
  name: {type: String, required: true},
  default: {type: Boolean, required: false, default: false},
  permissions: [{type: mongoose.Schema.Types.Mixed, required: true, default: []}],
},{
  timestamps: true,
});
import { Group } from "@/domain/entities";
import mongoose from "mongoose";

export const GroupMongoModel = new mongoose.Schema<Group>({
  _id: mongoose.Types.ObjectId,
  name: {type: String, required: true},
  permissions: [{type: mongoose.Schema.Types.Mixed, required: true, default: []}],
},{
  timestamps: true,
});
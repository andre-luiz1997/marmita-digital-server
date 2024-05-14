import { UserEntity } from "@/core/domain/entities";
import { GROUPS } from "@/permissions";
import { STATUSES } from "@/shared/types";
import mongoose from "mongoose";


export const UserMongoModel = new mongoose.Schema<UserEntity>({
  _id: mongoose.Types.ObjectId,
  name: {type: String, required: true},
  email: {type: String, required: false},
  mobile_phone: {type: String, required: false},
  password: {type: String, required: true},
  group: {type: String, enum: GROUPS, required: true},
  status: {type: String, enum: STATUSES, required: true},
  tenant: {type: mongoose.Types.ObjectId, ref: 'Tenant', required: false},
},{
  timestamps: true,
})
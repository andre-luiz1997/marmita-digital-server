import { ENTITIES } from "@/constants";
import { UserEntity } from "@/core/domain/entities";
import { GROUPS } from "@/permissions";
import { STATUSES } from "@/shared/types";
import mongoose, { Schema } from "mongoose";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";


export const UserMongoModel = new mongoose.Schema<UserEntity>({
  _id: mongoose.Types.ObjectId,
  name: {type: String, required: true},
  email: {type: String, required: false},
  mobile_phone: {type: Schema.Types.Mixed, required: false},
  password: {type: String, required: true},
  group: {type: String, enum: GROUPS, required: true},
  status: {type: String, enum: STATUSES, required: true, default: 'active'},
  tenant: {type: mongoose.Types.ObjectId, ref: ENTITIES.TENANT, required: false},
  deletedAt: {type: Date, default: null},
},{
  timestamps: true,
})

UserMongoModel.plugin(softDeletePlugin)
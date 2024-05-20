import { TenantEntity } from "core/domain/entities";
import mongoose, { Schema } from "mongoose";
import { STATUSES } from "shared/types";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

export const TenantMongoModel = new mongoose.Schema<TenantEntity>({
  _id: mongoose.Types.ObjectId,
  name: {type: String, required: true},
  billing: {type: Schema.Types.Mixed, required: false},
  status: {type: String, enum: STATUSES, required: true, default: 'active'},
  deletedAt: {type: Date, default: null},
},{
  timestamps: true,

})

TenantMongoModel.plugin(softDeletePlugin)
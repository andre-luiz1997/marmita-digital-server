import { TenantEntity } from "core/domain/entities";
import mongoose from "mongoose";
import { STATUSES } from "shared/types";

export const TenantMongoModel = new mongoose.Schema<TenantEntity>({
  _id: mongoose.Types.ObjectId,
  name: {type: String, required: true},
  status: {type: String, enum: STATUSES, required: true},
},{
  timestamps: true,
})
import { PlanEntity } from "core/domain/entities";
import { Schema, Types } from "mongoose";
import { STATUSES } from "shared/types";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

export const PlanMongoModel = new Schema<PlanEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: false },
  pricing: { type: Schema.Types.Mixed, required: true },
  featured: { type: Boolean, required: false, default: false },
  status: { type: String, enum: STATUSES, required: true, default: 'active' },
  deletedAt: { type: Date, default: null },
}, {
  timestamps: true,
}) 

PlanMongoModel.plugin(softDeletePlugin)
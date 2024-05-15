import { PlanEntity } from "core/domain/entities";
import { Schema, Types } from "mongoose";
import { STATUSES } from "shared/types";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

export const PlanMongoModel = new Schema<PlanEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  pricing: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: STATUSES, required: true, default: 'active' },
  deletedAt: { type: Date, default: null },
}, {
  timestamps: true,
}) 

PlanMongoModel.plugin(softDeletePlugin)
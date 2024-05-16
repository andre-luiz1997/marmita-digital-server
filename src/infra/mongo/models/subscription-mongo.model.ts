
import { ENTITIES } from '@/constants';
import { SubscriptionEntity } from 'core/domain/entities';
import { Schema, Types } from 'mongoose';
import { STATUSES } from 'shared/types';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export const SubscriptionMongoModel = new Schema<SubscriptionEntity>({
  plan: { type: Types.ObjectId, ref: ENTITIES.PLAN, required: true },
  tenant: { type: Types.ObjectId, ref: ENTITIES.TENANT, required: true },
  pricing: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: STATUSES, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
})

SubscriptionMongoModel.plugin(softDeletePlugin)
import { ENTITIES, TRANSACTION_STATUS } from "@/constants"
import { TransactionEntity } from "core/domain/entities"
import mongoose, { Schema } from "mongoose"
import { softDeletePlugin } from "soft-delete-plugin-mongoose"

export const TransactionMongoModel = new mongoose.Schema<TransactionEntity>({
  _id: mongoose.Types.ObjectId,
  gateway: {type: String, required: true},
  gatewayId: {type: String, required: true},
  amount: {type: Number, required: true},
  status: {type: String, enum: TRANSACTION_STATUS, required: true},
  paidAt: {type: Date, default: null},
  payment: {type: Schema.Types.Mixed, required: true},
  subscription: {type: mongoose.Types.ObjectId, ref: ENTITIES.SUBSCRIPTION, required: false},
  plan: {type: mongoose.Types.ObjectId, ref: ENTITIES.PLAN, required: false},
  tenant: {type: mongoose.Types.ObjectId, ref: ENTITIES.TENANT, required: false},
  deletedAt: {type: Date, default: null},
},{
  timestamps: true,
})

TransactionMongoModel.plugin(softDeletePlugin)
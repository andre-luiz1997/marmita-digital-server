import { Entity } from "core/base";
import { PlanEntity, PlanPricing } from "./plan.entity";

export class SubscriptionEntity extends Entity {
  public plan: PlanEntity;
  public status: string;
  public pricing: PlanPricing;
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}
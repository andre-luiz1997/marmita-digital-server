import { Entity } from "core/base";
import { PlanEntity, PlanPricing } from "./plan.entity";
import { PAYMENT_METHODS } from "@/constants";

export interface PixPayment {
  method: PAYMENT_METHODS.PIX;
}
export interface CardPayment {
  method: PAYMENT_METHODS.CARD;
  creditCard: {
    number: string;
    name: string;
    expiration: string;
    cvv: string;
    hash?: string;
  };
}
export type SubscriptionPayment = PixPayment | CardPayment;

export class SubscriptionEntity extends Entity {
  public plan: PlanEntity;
  public status: string;
  public payment: SubscriptionPayment;
  public pricing: PlanPricing;
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}
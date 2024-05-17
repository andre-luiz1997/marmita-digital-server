import { TRANSACTION_GATEWAYS, TRANSACTION_STATUS } from "@/constants";
import { Entity } from "core/base";
import { PlanEntity, SubscriptionEntity, SubscriptionPayment } from "../saas";
import { TenantEntity } from "../auth";

export class TransactionEntity extends Entity {
  public declare tenant: TenantEntity;
  public plan?: PlanEntity;
  public subscription?: SubscriptionEntity;
  public payment: SubscriptionPayment;
  /**
   * Payment gateway used to process the transaction
   */
  public gateway: TRANSACTION_GATEWAYS;
  /**
   * Transaction id inside payment gateway
   */
  public gatewayId: string;
  public amount: number;
  public status: TRANSACTION_STATUS;
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public paidAt?: Date;
}
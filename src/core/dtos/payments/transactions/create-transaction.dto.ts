import { TRANSACTION_GATEWAYS, TRANSACTION_STATUS } from "@/constants";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { PlanEntity, SubscriptionEntity, SubscriptionPayment, TenantEntity } from "core/domain/entities";

export class CreateTransactionDTO {
  @IsNotEmpty()
  public tenant: TenantEntity;
  @IsNotEmpty()
  public plan: PlanEntity;
  @IsNotEmpty()
  public subscription: SubscriptionEntity;
  @IsNotEmpty()
  public payment: SubscriptionPayment;
  @IsNotEmpty()
  @IsEnum(TRANSACTION_GATEWAYS)
  public gateway: TRANSACTION_GATEWAYS;
  @IsNotEmpty()
  @IsNumber()
  public amount: number;
}
import { TRANSACTION_GATEWAYS, TRANSACTION_STATUS } from "@/constants";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { PlanEntity, SubscriptionEntity, SubscriptionPayment, TenantEntity } from "core/domain/entities";
import { BillingDTO } from "./billing.dto";
import { Type } from "class-transformer";

export class CreateTransactionDTO {
  @IsOptional()
  public tenant?: TenantEntity;
  @IsNotEmpty() 
  @Type(() => BillingDTO)
  public billing: BillingDTO;
  @IsNotEmpty()
  public plan: PlanEntity;
  @IsNotEmpty()
  public subscription: SubscriptionEntity;
  @IsNotEmpty()
  public payment: SubscriptionPayment;
  
  @IsNotEmpty()
  @IsNumber()
  public amount: number;
}
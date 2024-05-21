import { TRANSACTION_GATEWAYS, TRANSACTION_STATUS } from "@/constants";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Validate, ValidateNested } from "class-validator";
import { PlanEntity, SubscriptionEntity, SubscriptionPayment, TenantEntity } from "core/domain/entities";
import { BillingDTO } from "./billing.dto";
import { Type } from "class-transformer";

export class CreateTransactionDTO {
  @IsNotEmpty()
  @IsEnum(TRANSACTION_GATEWAYS)
  gateway: TRANSACTION_GATEWAYS;

  @IsOptional()
  public tenant?: TenantEntity;
  @IsNotEmpty() 
  @Type(() => BillingDTO)
  @ValidateNested()
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
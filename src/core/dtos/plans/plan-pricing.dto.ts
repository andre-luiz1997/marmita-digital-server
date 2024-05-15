import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { PlanPricing } from "core/domain/entities";

export class PlanPricingDTO implements PlanPricing {
  @IsString()
  @IsNotEmpty()
  currency: string;
  
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  amount: number;
  
  @IsString()
  @IsNotEmpty()
  interval: string;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  intervalCount: number;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  trialPeriodDays: number;
}
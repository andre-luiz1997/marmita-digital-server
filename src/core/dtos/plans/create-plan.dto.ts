import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DTO } from "core/base";
import { PlanPricing } from "core/domain/entities";
import { STATUSES } from "shared/types";
import { PlanPricingDTO } from "./plan-pricing.dto";


export class CreatePlanDTO extends DTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  public description?: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEnum(STATUSES)
  public status: string;

  @IsOptional()
  @IsBoolean()
  public featured?: boolean;

  @IsNotEmpty()
  @Type(() => PlanPricingDTO)
  public pricing: PlanPricing;
}
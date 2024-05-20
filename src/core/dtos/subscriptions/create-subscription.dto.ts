import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DTO } from "core/base";
import { PlanEntity, TenantEntity } from "core/domain/entities";
import { BillingDTO } from "../payments";

export class CreateSubscriptionDTO extends DTO {
  @IsNotEmpty()
  @Type(() => PartialType(PlanEntity))
  plan: Partial<PlanEntity>;

  @IsString()
  @IsNotEmpty()
  paymentToken: string;

  @IsOptional()
  @Type(() => BillingDTO)
  billing?: BillingDTO;
}
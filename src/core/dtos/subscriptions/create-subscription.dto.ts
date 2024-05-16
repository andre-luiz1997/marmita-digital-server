import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { DTO } from "core/base";
import { PlanEntity, TenantEntity } from "core/domain/entities";

export class CreateSubscriptionDTO extends DTO {
  @IsNotEmpty()
  @Type(() => PartialType(PlanEntity))
  plan: Partial<PlanEntity>;

  @IsNotEmpty()
  declare tenant: TenantEntity;
}
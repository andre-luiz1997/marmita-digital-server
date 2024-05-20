import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DTO } from "core/base";
import { STATUSES } from "shared/types";
import { BillingDTO } from "../payments";
import { Type } from "class-transformer";

export class CreateTenantDTO extends DTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsEnum(STATUSES)
  status?: string;

  @IsOptional()
  @Type(() => BillingDTO)
  billing?: BillingDTO;
}
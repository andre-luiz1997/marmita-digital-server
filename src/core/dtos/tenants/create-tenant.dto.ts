import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DTO } from "core/base";
import { STATUSES } from "shared/types";

export class CreateTenantDTO extends DTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsEnum(STATUSES)
  status?: string;
}
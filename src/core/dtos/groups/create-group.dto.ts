import { IsValidPermissions } from "@/shared/validators/isPermission";
import { Permission } from "@/permissions";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, Validate, ValidateNested } from "class-validator";

export class CreateGroupDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsNotEmpty()
  @IsArray()
  @Validate(IsValidPermissions)
  permissions: Permission[];
  @IsOptional()
  @IsBoolean()
  default?: boolean;
}
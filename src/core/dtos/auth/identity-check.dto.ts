import { IsOptional, IsString, IsEmail, IsBoolean, IsBooleanString } from "class-validator";

export class IdentityCheckDTO {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  mobile_phone?: string;
  @IsOptional()
  @IsBooleanString()
  isTenantAdmin?: boolean;
}
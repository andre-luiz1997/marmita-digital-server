import { IsOptional, IsString, IsEmail } from "class-validator";

export class IdentityCheckDTO {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  mobile_phone?: string;
}
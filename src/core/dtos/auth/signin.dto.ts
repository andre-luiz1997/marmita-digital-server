import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";
import { DTO } from "core/base";

export class SigninDTO extends DTO {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  mobile_phone?: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
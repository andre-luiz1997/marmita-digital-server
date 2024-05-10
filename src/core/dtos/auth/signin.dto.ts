import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class SigninDTO {
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
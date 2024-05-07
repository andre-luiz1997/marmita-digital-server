import { hash } from "bcrypt";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class SigninDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
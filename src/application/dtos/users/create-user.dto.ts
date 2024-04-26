import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword()
  password: string;
}
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
import {hash} from 'bcrypt';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @Transform(async ({value}) => await hash(value,10))
  password: string;
}
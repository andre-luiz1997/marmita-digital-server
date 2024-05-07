import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import {hashSync} from 'bcrypt';

export class CreateUserDTO {
  @IsOptional()
  _id?: string;

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
  @MinLength(8)
  @Transform(({value}) => hashSync(value,10))
  password: string;

  @IsNotEmpty()
  @IsString()
  groupId: string;
}
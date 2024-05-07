import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";
import {hashSync} from 'bcrypt';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Transform(({value}) => value ? hashSync(value,10) : null)
  password?: string;
  @IsOptional()
  @IsString()
  groupId?: string;
}
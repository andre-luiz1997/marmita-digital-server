import { Transform, Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import {hashSync} from 'bcrypt';
import { Phone } from "core/domain/entities";
import { PhoneDTO } from "../phone.dto";
import { DTO } from "core/base";
import { GROUPS } from "@/permissions";

export class CreateUserDTO extends DTO {
  @IsOptional()
  _id?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @IsOptional()
  @Type(() => PhoneDTO)
  mobile_phone?: Phone;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Transform(({value}) => hashSync(value,10))
  password: string;

  @IsOptional()
  @IsString()
  @IsEnum(GROUPS)
  group?: GROUPS;
}
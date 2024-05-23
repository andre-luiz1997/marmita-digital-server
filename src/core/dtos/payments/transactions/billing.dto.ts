import { PERSON_TYPES } from "@/constants";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { AddressDTO } from "core/dtos/address.dto";
import { BillingDocumentDTO } from "./billing-document.dto";
import { BillingDocument, Phone } from "core/domain/entities";

export class BillingDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsEnum(PERSON_TYPES)
  type: PERSON_TYPES;
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  phones?: Phone[];

  @IsOptional()
  @IsString()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsArray()
  @Type(() => BillingDocumentDTO)
  @ValidateNested({ each: true })
  documents?: BillingDocument[];

  @IsNotEmpty()
  @Type(() => AddressDTO)
  @ValidateNested()
  address: AddressDTO;
}
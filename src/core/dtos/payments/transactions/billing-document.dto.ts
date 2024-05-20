import { PERSON_TYPES } from "@/constants";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class BillingDocumentDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(PERSON_TYPES)
  type: PERSON_TYPES;
  @IsNotEmpty()
  @IsString()
  number: string;
}
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class AddressDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  country: string;
  @IsNotEmpty()
  @IsString()
  state: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  neighborhood: string;
  @IsNotEmpty()
  @IsString()
  street: string;
  @IsOptional()
  @IsString()
  street_number?: string;
  @IsNotEmpty()
  @IsString()
  zipcode: string;
}
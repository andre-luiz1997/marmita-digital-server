import { IsNotEmpty, IsString, Length } from "class-validator";
import { Phone } from "core/domain/entities";

export class PhoneDTO implements Phone {
  @IsNotEmpty()
  @IsString()
  @Length(2,2)
  country: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
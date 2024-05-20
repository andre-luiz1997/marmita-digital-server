import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { Address } from "core/domain/entities";
import { ZipcodeProvider } from "core/providers";

@Injectable()
export class FetchZipcodeUseCase implements UseCase<Address> {
  constructor(
    private zipcodeProvider: ZipcodeProvider
  ) {}

  execute(zipcode: string): Promise<Address> {
    return this.zipcodeProvider.fetchAddress(zipcode);
  }
}
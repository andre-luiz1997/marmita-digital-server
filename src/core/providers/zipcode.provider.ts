import { Address } from "core/domain/entities";

export abstract class ZipcodeProvider {
  abstract fetchAddress(zipcode: string): Promise<Address>;
} 
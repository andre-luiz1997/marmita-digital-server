import { PERSON_TYPES } from "@/constants";
import { Address } from "../address";
import { Phone } from "../phone";

export interface BillingDocument {
  type: PERSON_TYPES;
  number: string;
}

export interface Billing {
  name: string;
  email: string;
  type: PERSON_TYPES;
  phones?: Phone[];
  birthday?: string;
  documents?: BillingDocument[];
  address: Address;
}

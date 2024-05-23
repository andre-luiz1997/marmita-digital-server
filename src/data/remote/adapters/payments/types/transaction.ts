import { TRANSACTION_GATEWAYS, TRANSACTION_STATUS } from "@/constants";
import { Address } from "core/domain/entities";

interface PagarmeCustomerDocument {
  type: 'individual' | 'corporation';
  number: string;
}

interface PagarmeCustomer {
  /** Customer id in your platform */
  external_id: string;
  name: string;
  email: string;
  /** @example br, us */
  country: string;
  type: 'individual' | 'corporation';
  documents: PagarmeCustomerDocument[];
  /** Array of strings following format E.164
   * @example +5531999999999
   */
  phone_numbers: string[];
  /** @example 1965-01-15 */
  birthday?: string;
}

interface PagarmeBillingAddress {
  name: string;
  address: {
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    street_number: string;
    zipcode: string;
  }
}

export interface PagarmeItem {
  id: string;
  title: string;
  /** Price by item unity, in cents
   *  @example R$20,06 = 2006 
   */
  unit_price: number;
  quantity: number;
  /** Indicates if the item is digital or should be shipped to the buyer */
  tangible: boolean;
  category?: string;
}

interface BasePagarmeTransaction {
  amount: number;
  payment_method: 'credit_card' | 'boleto';
  /** Any metadata that can be used for future organization. Must be a string in json format
   * @example '{"key": "value"}'
   */
  metadata?: string;
  postback_url?: string;
  /** If passed true, indicates that the response should be returned on the request, not via postback_url */
  async?: boolean;
  /** Number of parcels. If boleto, then installments is 1 */
  installments?: number;
  /** Unique identifier to prevent duplicates */
  reference_key?: string;
  /** Date and time of the device requiring the transaction
   * @description "yyyy-MM-dd'T'HH:mm:ss'Z'"
   * @example "2016-12-16T14:00:00Z"
   */
  local_time?: string;
  customer: PagarmeCustomer;
  billing: PagarmeBillingAddress;
  items: PagarmeItem[];
}

interface BasePagarmeCreditCardTransaction extends BasePagarmeTransaction {
  payment_method: 'credit_card';
}

interface PagarmeBoletoChargeAmount {
  /** Number of days after expiration in which the fine should be charged */
  days: number;
  /** Value of the charge (full value, not percentage) */
  amount: number;
}

interface PagarmeBoletoChargePercentage {
  /** Number of days after expiration in which the fine should be charged */
  days: number;
  /** Percentage of charge */
  percentage: string;
}

interface PagarmeTransactionBoleto extends BasePagarmeTransaction {
  payment_method: 'boleto';
  installments: 1;
  /** Date of expiring
   * @example "yyyy-MM-dd"
   */
  boleto_expiration_date: string;
  /** Text field with payment instructions for boleto  */
  boleto_instructions?: string;
  boleto_fine?: PagarmeBoletoChargeAmount | PagarmeBoletoChargePercentage;
  boleto_intererest?: PagarmeBoletoChargeAmount | PagarmeBoletoChargePercentage;
  /** 
   * @example "strict_expiration_date": The boleto will be valid only for the expiration date, and only the exact amount will be accepted.
   * @example "no_strict": The boleto will be valid after expiration date following fines and interests.
   */
  boleto_rules?: 'strict_expiration_date' | 'no_strict';
}

interface WithCardId extends BasePagarmeCreditCardTransaction {
  /** The id returned by mediator that can be used instead of the card details */
  card_id: string;
  card_cvv?: string;
}

interface WithoutCardId extends BasePagarmeCreditCardTransaction {
  card_id?: never;
  card_hash: string;
  card_cvv: string;
  card_holder_name: string;
  /** Mask MMYY */
  card_expiration_date: string;
  card_number: string;
}

type PagarmeTransactionCreditCard = WithCardId | WithoutCardId;

export type PagarmeTransaction = PagarmeTransactionCreditCard | PagarmeTransactionBoleto;

export interface PagarmeTransactionResponse {
  object: string;
  status: string;
  refse_reason?: string;
  status_reason?: string;
  acquirer_response_code?: string;
  acquirer_name?: string;
  acquirer_id?: string;
  authorization_code?: string;
  soft_descriptor?: string;
  tid?: number;
  nsu?: number;
  date_created?: string;
  date_updated?: string;
  amount?: number;
  authorized_amount?: number;
  paid_amount?: number;
  refunded_amount?: number;
  installments?: number;
  id?: number;
  cost?: number;
  card_holder_name?: string;
  card_last_digits?: string;
  card_first_digits?: string;
  card_brand?: string;
  card_pin_mode?: string;
  postback_url?: string;
  payment_method?: string;
  capture_method?: string;
  antifraud_score?: string;
  boleto_url?: string;
  boleto_barcode?: string;
  referer?: string;
  ip?: string;
  subscription_id?: string;
  phone?: string;
  address?: string;
  customer?: {
    object?: string;
    id?: string;
    external_id?: string;
    type?: string;
    country?: string;
    document_number?: string;
    document_type?: string;
    name?: string;
    email?: string;
    phone_numbers?: string[];
    born_at?: string;
    birthday?: string;
    gender?: string;
    date_created?: string;
    documents?: {
      object?: string;
      id?: string;
      type?: string;
      number?: string;
    }[]
  },
  billing?: {
    address?: Address;
    object?: string;
    id?: number;
    name?: string;
  },
  shipping?: {
    address?: Address;
    object?: string;
    id?: number;
    name?: string;
    fee?: number;
    delivery_date?: string;
    expedited?: boolean;
  },
  items?: {
    object?: string;
    id?: string;
    title?: string;
    unit_price?: number;
    quantity?: number;
    category?: string;
    tangible?: boolean;
    venue?: string;
    date?: string;
  }[],
  card?: {
    object?: string;
    id?: string;
    date_created?: string;
    date_updated?: string;
    brand?: string;
    holder_name?: string;
    first_digits?: string;
    last_digits?: string;
    country?: string;
    fingerprint?: string;
    valid?: boolean;
    expiration_date?: string;
  },
  split_rules?: string;
  metadata?: any;
  antifraud_metadata?: any;
  reference_key?: string;
}

export function isWithoutCardId(transaction: PagarmeTransaction): transaction is WithoutCardId {
  return !!(transaction as WithoutCardId).card_hash;
}

export function getTransactionStatus(gateway: TRANSACTION_GATEWAYS, status: string) {
  const statusMap: {[key in TRANSACTION_GATEWAYS]: any} = {
    PAGARME: {
      'paid': TRANSACTION_STATUS.PAID,
      'processing': TRANSACTION_STATUS.PENDING,
      'refunded': TRANSACTION_STATUS.REFUNDED,
      'refused': TRANSACTION_STATUS.REJECTED,
      'waiting_payment': TRANSACTION_STATUS.PENDING,
    },
    MERCADOPAGO: {},
    PAYPAL: {},
    STRIPE: {},
  }
  const transactionStatus = statusMap[gateway]?.[status]
  if(transactionStatus) return transactionStatus;
  return status;
}
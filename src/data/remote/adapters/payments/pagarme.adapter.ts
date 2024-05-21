import axios from "axios";
import { CardPayment, TransactionEntity } from "core/domain/entities";
import { CreateTransactionDTO } from "core/dtos";
import { PaymentProvider } from "core/providers";
import { CreatePagarmeTransactionMapper, PagarmeTransactionMapper } from "./mappers";
import { PagarmeCardHashKeyResponse, isWithoutCardId } from "./types";
import { Crypto } from "crypto/crypto";
import { PAYMENT_METHODS, TRANSACTION_GATEWAYS } from "@/constants";

interface RequestOptions {
  withEncryptionKey?: boolean;
}

export class PagarmeAdapter implements PaymentProvider {
  private crypto = Crypto.getInstance();
  private endpoint = 'https://api.pagar.me/1';
  private environment: 'production' | 'sandbox' = 'sandbox';
  private api_key = 'ak_test_4bn0kVOezXZ885s0sRrZmNQPGd8vg1';
  private encryption_key = 'ek_test_oMf5Ohdntd1CXxHq79azt1m8ZbzMSB';

  private configuration(options?: RequestOptions) {
    const config: any = {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Basic ${Buffer.from(this.api_key).toString('base64')}`
      },
      auth: {
        username: this.api_key,
        password: 'x'
      }
    }
    if (options?.withEncryptionKey) {
      config['api_key'] = this.encryption_key;
    }
    return config
  }

  private get(url: string, options?: RequestOptions) {
    return axios.get(`${this.endpoint}/${url}`, this.configuration(options));
  }

  private post(url: string, data: any, options?: RequestOptions) {
    return axios.post(`${this.endpoint}/${url}`, data, this.configuration(options));
  }

  // constructor() {
  //   const dto = new CreateTransactionDTO();
  //   dto.amount = 1000;
  //   dto.gateway = TRANSACTION_GATEWAYS.PAGARME;
  //   dto.payment = {
  //     method: PAYMENT_METHODS.CARD,
  //     creditCard: {
  //       cvv: '123',
  //       number: '4111111111111111',
  //       expiration: '1025',
  //       name: 'John Doe'
  //     }
  //   }
  //   this.createTransaction(dto);
  // }

  private async getCardHash(card: CardPayment) {
    const hash_key = await this.get('transactions/card_hash_key') as unknown as PagarmeCardHashKeyResponse;
    const query = new URLSearchParams({
      card_number: card.creditCard.cvv,
      card_holder_name: card.creditCard.name,
      card_expiration_date: card.creditCard.expiration,
      card_cvv: card.creditCard.cvv,
    }).toString();
    const encrypted = this.crypto.publicEncrypt(query, hash_key.public_key);
    return `${hash_key.id}_${encrypted}`;
  }

  async createTransaction(data: CreateTransactionDTO): Promise<TransactionEntity> {
    try {
      const mapper = new CreatePagarmeTransactionMapper();
      const pagarmeTransaction = mapper.mapFrom(data);
      if (pagarmeTransaction.payment_method == 'credit_card' && data.payment.method == PAYMENT_METHODS.CARD && isWithoutCardId(pagarmeTransaction) && !pagarmeTransaction.card_hash) {
        pagarmeTransaction.card_hash = await this.getCardHash(data.payment);
      }
      console.log('🚀 ~ file: pagarme.adapter.ts:80 ~ PagarmeAdapter ~ createTransaction ~ pagarmeTransaction 🚀 ➡➡', pagarmeTransaction);
      const transactionMapper = new PagarmeTransactionMapper();
      const response = await this.post('transactions', pagarmeTransaction);
      return transactionMapper.mapTo(response.data)
    } catch (error) {
      if (error.response?.data) {
        console.log('🚀 ~ file: pagarme.adapter.ts:78 ~ PagarmeAdapter ~ createTransaction ~ error 🚀 ➡➡', error.response.data);
      }
      throw error;
    }
  }
}
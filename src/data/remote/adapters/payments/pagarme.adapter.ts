import { TransactionEntity } from "core/domain/entities";
import { CreateTransactionDTO } from "core/dtos";
import { PaymentProvider } from "core/providers";
import pagarme from 'pagarme';

export class PagarmeAdapter implements PaymentProvider {
  private client: any; 

  constructor() {
    this.client = pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY

    });
  }

  createTransaction(data: CreateTransactionDTO): Promise<TransactionEntity> {
    throw new Error("Method not implemented.");
  }
}
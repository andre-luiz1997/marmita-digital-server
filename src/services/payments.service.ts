import { TRANSACTION_GATEWAYS } from '@/constants';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from 'core/dtos';
import { PaymentProvider } from 'core/providers';
import { PagarmeAdapter } from 'data/remote/adapters';
import { AdapterNotFoundException } from 'shared/exceptions';

@Injectable()
export class PaymentsService {
  private readonly adapters: { [key in TRANSACTION_GATEWAYS]?: PaymentProvider } = {}

  constructor(
    private readonly pagarmeAdapter: PagarmeAdapter,
  ) {
    this.adapters = {
      [TRANSACTION_GATEWAYS.PAGARME]: this.pagarmeAdapter,
    }
  } 

  async createTransaction(provider: string, data: CreateTransactionDTO) {
    const adapter = this.adapters[provider];
    if(!adapter) throw new AdapterNotFoundException(provider);
    return adapter.createTransaction(data);
  }
}

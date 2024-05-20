import { PAYMENT_METHODS, TRANSACTION_GATEWAYS } from '@/constants';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateTransactionDTO } from 'core/dtos';
import { PaymentsService } from 'services/payments.service';
import { CustomRequest } from 'shared/types';

@Controller('/payments')
export class PaymentController {
  constructor(
    private paymentsService: PaymentsService
  ) { }

  @Post('/transaction')
  async createTransaction(
    @Req() req: CustomRequest,
    @Body() body: CreateTransactionDTO
  ) {
    const provider = TRANSACTION_GATEWAYS.PAGARME;
    if (req.tenant) {
      body.tenant = req.tenant;
    }
    return this.paymentsService.createTransaction(provider, body);
  }
}

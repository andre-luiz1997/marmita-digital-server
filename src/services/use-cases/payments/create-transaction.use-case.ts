import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { CreateTransactionDTO } from "core/dtos";
import { PaymentsService } from "services/payments.service";
import { AdapterNotFoundException } from "shared/exceptions";

@Injectable()
export class CreateTransactionUseCase implements UseCase<any> {

  execute(data: CreateTransactionDTO): Promise<any> {
    const adapter = PaymentsService.adapters[data.gateway];
    if (!adapter) throw new AdapterNotFoundException(data.gateway);
    return adapter.createTransaction(data);
  }
}
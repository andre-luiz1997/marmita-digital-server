import { TRANSACTION_STATUS } from "@/constants";
import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { TransactionEntity } from "core/domain/entities";
import { CreateTransactionDTO } from "core/dtos";
import { TransactionRepository } from "core/repositories";
import { PaymentsService } from "services/payments.service";
import { AdapterNotFoundException } from "shared/exceptions";

@Injectable()
export class CreateTransactionUseCase implements UseCase<TransactionEntity> {

  constructor(
    private readonly repository: TransactionRepository
  ) {}

  async execute(data: CreateTransactionDTO): Promise<TransactionEntity> {
    const adapter = PaymentsService.adapters[data.gateway];
    if (!adapter) throw new AdapterNotFoundException(data.gateway);
    const transaction = await adapter.createTransaction(data);
    if(transaction.status == TRANSACTION_STATUS.PAID) transaction.paidAt = transaction.createdAt;
    return this.repository.create(transaction);
  }
}
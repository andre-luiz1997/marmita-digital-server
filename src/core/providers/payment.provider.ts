import { TransactionEntity } from "core/domain/entities";
import { CreateTransactionDTO } from "core/dtos";

export abstract class PaymentProvider {
  abstract createTransaction(data: CreateTransactionDTO): Promise<TransactionEntity>;
} 
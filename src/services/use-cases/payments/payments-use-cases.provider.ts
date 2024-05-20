import { CreateTransactionUseCase } from "./create-transaction.use-case";

export const paymentsUseCasesProvider = [
  {
    provide: CreateTransactionUseCase,
    useClass: CreateTransactionUseCase
  }
]
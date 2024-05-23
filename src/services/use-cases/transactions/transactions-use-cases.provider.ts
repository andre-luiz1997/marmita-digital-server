import { FindAllTransactionsUseCase } from "./find-all-transactions.use-case";

export const transactionsUseCasesProvider = [
  {
    provide: FindAllTransactionsUseCase,
    useClass: FindAllTransactionsUseCase
  }
]
import { FetchZipcodeUseCase } from "./fetch-zipcode.use-case";
import { paymentsUseCasesProvider } from "./payments";
import { planUseCasesProviders } from "./plans";
import { subscriptionsUseCasesProviders } from "./subscriptions";
import { tenantsUseCasesProviders } from "./tenants";
import { transactionsUseCasesProvider } from "./transactions";
import { usersUseCasesProviders } from "./users";

export const useCasesProviders = [
  ...usersUseCasesProviders,
  ...tenantsUseCasesProviders,
  ...planUseCasesProviders,
  ...subscriptionsUseCasesProviders,
  ...paymentsUseCasesProvider,
  ...transactionsUseCasesProvider,
  {
    provide: FetchZipcodeUseCase,
    useClass: FetchZipcodeUseCase
  }
]
import { CreateSubscriptionUseCase } from "./create-subscription.use-case";

export const subscriptionsUseCasesProviders = [
  {
    provide: CreateSubscriptionUseCase,
    useClass: CreateSubscriptionUseCase
  }
]
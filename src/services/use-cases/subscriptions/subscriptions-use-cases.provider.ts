import { CreateSubscriptionUseCase } from "./create-subscription.use-case";
import { FindSubscriptionByIdUseCase } from "./find-subscription-by-id.use-case";
import { FindSubscriptionUseCase } from "./find-subscription.use-case";

export const subscriptionsUseCasesProviders = [
  {
    provide: CreateSubscriptionUseCase,
    useClass: CreateSubscriptionUseCase
  },
  {
    provide: FindSubscriptionByIdUseCase,
    useClass: FindSubscriptionByIdUseCase
  },
  {
    provide: FindSubscriptionUseCase,
    useClass: FindSubscriptionUseCase
  },
]
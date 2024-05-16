import { planUseCasesProviders } from "./plans";
import { subscriptionsUseCasesProviders } from "./subscriptions";
import { tenantsUseCasesProviders } from "./tenants";
import { usersUseCasesProviders } from "./users";

export const useCasesProviders = [
  ...usersUseCasesProviders,
  ...tenantsUseCasesProviders,
  ...planUseCasesProviders,
  ...subscriptionsUseCasesProviders
]
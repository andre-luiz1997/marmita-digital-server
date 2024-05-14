import { tenantsUseCasesProviders } from "./tenants";
import { usersUseCasesProviders } from "./users";

export const useCasesProviders = [
  ...usersUseCasesProviders,
  ...tenantsUseCasesProviders
]
import { CreateTenantUseCase } from "./create-tenant.use-case";

export const tenantsUseCasesProviders = [
  {
    provide: CreateTenantUseCase,
    useClass: CreateTenantUseCase
  },
]
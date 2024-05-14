import { CreateTenantUseCase } from "./create-tenant.use-case";
import { DeleteTenantUseCase } from "./delete-tenant.use-case";
import { FindAllTenantsUseCase } from "./find-all-tenants.use-case";
import { FindTenantByIdUseCase } from "./find-tenant-by-id.use-case";
import { FindTenantUseCase } from "./find-tenant.use-case";
import { UpdateTenantUseCase } from "./update-tenant.use-case";

export const tenantsUseCasesProviders = [
  {
    provide: CreateTenantUseCase,
    useClass: CreateTenantUseCase
  },
  {
    provide: FindAllTenantsUseCase,
    useClass: FindAllTenantsUseCase
  },
  {
    provide: FindTenantByIdUseCase,
    useClass: FindTenantByIdUseCase
  },
  {
    provide: FindTenantUseCase,
    useClass: FindTenantUseCase
  },
  {
    provide: UpdateTenantUseCase,
    useClass: UpdateTenantUseCase
  },
  {
    provide: DeleteTenantUseCase,
    useClass: DeleteTenantUseCase
  },
]
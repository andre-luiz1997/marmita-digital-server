import { UseCase } from "core/base";
import { TenantEntity } from "core/domain/entities";

export class CreateTenantUseCase implements UseCase<TenantEntity> {
  execute(...args: any[]): Promise<TenantEntity> {
    throw new Error("Method not implemented.");
  }
}
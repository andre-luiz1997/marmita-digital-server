import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { TenantEntity } from "core/domain/entities";
import { TenantRepository } from "core/repositories";

@Injectable()
export class FindTenantUseCase implements UseCase<TenantEntity> {
  constructor(
    private readonly tenantRepository: TenantRepository,
  ) {}

  async execute(filter: any): Promise<TenantEntity> {
    return this.tenantRepository.findOne(filter);
  }
}
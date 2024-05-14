import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { TenantEntity } from "core/domain/entities";
import { TenantRepository } from "core/repositories";

@Injectable()
export class FindTenantByIdUseCase implements UseCase<TenantEntity> {
  constructor(
    private readonly tenantRepository: TenantRepository,
  ) {}

  async execute(_id: any): Promise<TenantEntity> {
    return this.tenantRepository.findOneById(_id);
  }
}
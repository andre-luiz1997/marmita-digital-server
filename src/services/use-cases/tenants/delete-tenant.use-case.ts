import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { TenantEntity } from "core/domain/entities";
import { TenantRepository } from "core/repositories";

@Injectable()
export class DeleteTenantUseCase implements UseCase<TenantEntity> {
  constructor(
    private readonly tenantRepository: TenantRepository,
  ) { }

  async execute(_id: any) {
    await this.tenantRepository.delete(_id)
    const item = await this.tenantRepository.findOneById(_id);
    return item;
  }
}
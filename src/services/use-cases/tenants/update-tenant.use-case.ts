import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { TenantEntity } from "core/domain/entities";
import { UpdateTenantMapper } from "core/domain/mappers/tenants";
import { UpdateTenantDTO } from "core/dtos";
import { TenantRepository } from "core/repositories";

@Injectable()
export class UpdateTenantUseCase implements UseCase<TenantEntity> {
  constructor(
    private readonly tenantRepository: TenantRepository,
  ) { }

  async execute(_id: any, data: UpdateTenantDTO): Promise<TenantEntity> {
    const mapper = new UpdateTenantMapper();
    const item = mapper.mapFrom(data);
    await this.tenantRepository.update(_id, item);
    return this.tenantRepository.findOneById(_id);
  }
}
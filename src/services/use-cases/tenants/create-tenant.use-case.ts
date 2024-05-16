import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { TenantEntity } from "core/domain/entities";
import { CreateTenantMapper } from "core/domain/mappers/tenants";
import { CreateTenantDTO } from "core/dtos";
import { TenantRepository } from "core/repositories";

@Injectable()
export class CreateTenantUseCase implements UseCase<TenantEntity> {
  constructor(
    private readonly tenantRepository: TenantRepository,
  ) {}

  async execute(data: CreateTenantDTO) {
    const mapper = new CreateTenantMapper();
    const item = mapper.mapFrom(data);
    const tenant = await this.tenantRepository.create(item);
    return this.tenantRepository.findOneById(tenant._id);
  }
}
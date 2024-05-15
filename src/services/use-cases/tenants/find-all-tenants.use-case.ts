import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { TenantEntity } from "core/domain/entities";
import { TenantRepository } from "core/repositories";
import { PaginationProps } from "shared/types";

@Injectable()
export class FindAllTenantsUseCase implements UseCase<{data: TenantEntity[], count: number}> {
  constructor(
    private readonly tenantRepository: TenantRepository,
  ) {}

  async execute(props?: PaginationProps): Promise<{data: TenantEntity[], count: number}> {
    return this.tenantRepository.findAll(props);
  }
}
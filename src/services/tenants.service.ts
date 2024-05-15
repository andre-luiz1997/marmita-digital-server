import { Injectable } from '@nestjs/common';
import { CreateTenantUseCase } from './use-cases';
import { CreateTenantDTO, UpdateTenantDTO } from 'core/dtos';
import { FindTenantUseCase } from './use-cases/tenants/find-tenant.use-case';
import { TenantEntity } from 'core/domain/entities';
import { FindTenantByIdUseCase } from './use-cases/tenants/find-tenant-by-id.use-case';
import { FindAllTenantsUseCase } from './use-cases/tenants/find-all-tenants.use-case';
import { UpdateTenantUseCase } from './use-cases/tenants/update-tenant.use-case';
import { DeleteTenantUseCase } from './use-cases/tenants/delete-tenant.use-case';
import { PaginationProps } from 'shared/types';

@Injectable()
export class TenantsService {
  constructor(
    private readonly createTenantUseCase: CreateTenantUseCase,
    private readonly findTenantUseCase: FindTenantUseCase,
    private readonly findTenantByIdUseCase: FindTenantByIdUseCase,
    private readonly findAllTenantsUseCase: FindAllTenantsUseCase,
    private readonly updateTenantUseCase: UpdateTenantUseCase,
    private readonly deleteTenantUseCase: DeleteTenantUseCase,
  ) {}

  async create(data: CreateTenantDTO) {
    return this.createTenantUseCase.execute(data);
  }

  async findOne(filter: any) {
    return this.findTenantUseCase.execute(filter);
  }

  async findOneById(_id: any) {
    return this.findTenantByIdUseCase.execute(_id);
  }

  async findAll(pagination?: PaginationProps) {
    return this.findAllTenantsUseCase.execute(pagination);
  }

  async update(_id: any, data: UpdateTenantDTO) {
    return this.updateTenantUseCase.execute(_id,data);
  }

  async delete(_id: any) {
    return this.deleteTenantUseCase.execute(_id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTenantDTO, UpdateTenantDTO } from 'core/dtos';
import { ControllerResponse } from 'presentation/response';
import { TenantsService } from 'services/tenants.service';
import { Pagination } from 'shared/decorators/pagination.decorator';
import { PaginationProps } from 'shared/types';

@Controller('/tenants')
export class TenantController {
  constructor(
    private readonly tenantsService: TenantsService
  ) { }

  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    return ControllerResponse.build({ data: await this.tenantsService.findOneById(id) });
  }

  @Get()
  async find(
    @Pagination() pagination: PaginationProps
  ) {
    const { data, count } = await this.tenantsService.findAll(pagination);
    return ControllerResponse.build({ data, count });
  }

  @Post()
  async create(
    @Body() data: CreateTenantDTO
  ) {
    return ControllerResponse.build({ data: await this.tenantsService.create(data) });
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTenantDTO
  ) {
    return ControllerResponse.build({ data: await this.tenantsService.update(id, data) });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return ControllerResponse.build({ data: await this.tenantsService.delete(id) });
  }
}

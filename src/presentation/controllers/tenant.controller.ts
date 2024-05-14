import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTenantDTO, UpdateTenantDTO } from 'core/dtos';
import { TenantsService } from 'services/tenants.service';

@Controller('/tenants')
export class TenantController {
  constructor(
    private readonly tenantsService: TenantsService
  ) {}

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.tenantsService.findOneById(id);
  }

  @Get()
  find() {
    return this.tenantsService.findAll();
  }

  @Post()
  create(
    @Body() data: CreateTenantDTO
  ) {
    return this.tenantsService.create(data);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateTenantDTO
  ) {
    return this.tenantsService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.tenantsService.delete(id);
  }
}

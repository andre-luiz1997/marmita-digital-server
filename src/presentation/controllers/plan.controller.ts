import { TENANT_GROUPS, ADMIN_GROUPS } from '@/permissions';
import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreatePlanDTO, UpdatePlanDTO } from 'core/dtos';
import { ControllerResponse } from 'presentation/response';
import { PlansService } from 'services/plans.service';
import { Pagination } from 'shared/decorators/pagination.decorator';
import { CustomRequest, PaginationProps } from 'shared/types';

@Controller('/plans')
export class PlanController {
  constructor(
    private readonly service: PlansService
  ) { }

  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    return ControllerResponse.build({
      data: await this.service.findOneById(id)
    });
  }

  @Get()
  async find(
    @Pagination() pagination: PaginationProps) {
    const { data, count } = await this.service.findAll(pagination);
    return ControllerResponse.build({
      data,
      count
    });
  }

  @Post('')
  async create(
    @Body() data: CreatePlanDTO
  ) {
    return ControllerResponse.build({
      data: await this.service.create(data)
    });
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePlanDTO
  ) {
    return ControllerResponse.build({
      data: await this.service.update(id, data)
    });
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string) {
    return ControllerResponse.build({
      data: await this.service.delete(id)
    });
  }
}

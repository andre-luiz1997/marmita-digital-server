import { ADMIN_GROUPS, TENANT_GROUPS } from '@/permissions';
import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateUserDTO } from 'core/dtos';
import { UpdateUserDTO } from 'core/dtos/users/update-user.dto';
import { ControllerResponse } from 'presentation/response';
import { UsersService } from 'services/users.service';
import { Pagination } from 'shared/decorators/pagination.decorator';
import { CustomRequest, PaginationProps } from 'shared/types';
@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    return ControllerResponse.build({
      data: await this.userService.findOneById(id)
    });
  }

  @Get()
  async find(
    @Req() req: CustomRequest,
    @Pagination() pagination: PaginationProps) {
    if (!pagination.filters) pagination.filters = [];
    if (req.tenant) {
      pagination.filters.push({
        fields: ['group'],
        operator: 'IN',
        value: Object.values(TENANT_GROUPS)
      });
      pagination.filters.push({
        fields: ['tenant'],
        operator: 'LIKE',
        value: req.tenant._id
      });
    } else {
      pagination.filters.push({
        fields: ['group'],
        operator: 'IN',
        value: Object.values(ADMIN_GROUPS)
      });
    }
    const { data, count } = await this.userService.findAll(pagination);
    return ControllerResponse.build({
      data,
      count
    });
  }

  @Post('')
  async create(
    @Req() req: CustomRequest,
    @Body() data: CreateUserDTO
  ) {
    if(req.tenant) {
      data.tenant = req.tenant;
    }
    return ControllerResponse.build({
      data: await this.userService.create(data)
    });
  }

  @Patch('/:id')
  async update(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() data: UpdateUserDTO
  ) {
    if(req.tenant) {
      data.tenant = req.tenant;
    }
    return ControllerResponse.build({
      data: await this.userService.update(id, data)
    });
  }

  @Delete('/:id')
  async delete(
    @Req() req: CustomRequest,
    @Param('id') id: string) {
    if (req.user?._id == id) throw new ConflictException('user_delete_conflict_exception');
    return ControllerResponse.build({
      data: await this.userService.delete(id)
    });
  }
}

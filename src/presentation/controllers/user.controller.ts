import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDTO } from 'core/dtos/users/update-user.dto';
import { ControllerResponse } from 'presentation/response';
import { UsersService } from 'services/users.service';
import { Pagination } from 'shared/decorators/pagination.decorator';
import { PaginationProps } from 'shared/types';
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
  async find(@Pagination() pagination: PaginationProps) {
    const {data, count} = await this.userService.findAll(pagination);
    return ControllerResponse.build({
      data,
      count
    });
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO
  ) {
    return ControllerResponse.build({
      data: await this.userService.update(id, data)
    });
  }
}

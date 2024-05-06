import { UserService } from '@/domain/services/user.service';
import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { REPOSITORIES } from '@/constants';
import { UpdateUserDTO } from '../dtos/users/udate-user.dto';
import { UsePermissions } from '../decorators';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(REPOSITORIES.USER) private readonly userService: UserService
  ) {}

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  find() {
    return this.userService.find();
  }

  @Patch('/:id')
  @UsePermissions()
  update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    return this.userService.update(id, data);
  }
}

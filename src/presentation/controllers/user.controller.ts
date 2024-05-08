import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDTO } from 'core/dtos/users/update-user.dto';
import { UsersService } from 'services/users.service';
@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get()
  find() {
    return this.userService.findAll();
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO
  ) {
    return this.userService.update(id, data);
  }
}

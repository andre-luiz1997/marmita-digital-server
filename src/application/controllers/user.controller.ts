import { UserService } from '@/domain/services/user.service';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import type { CreateUserDTO } from '../dtos/users/create-user.dto';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService
  ) {}

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  find() {
    return this.userService.find();
  }

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }
}

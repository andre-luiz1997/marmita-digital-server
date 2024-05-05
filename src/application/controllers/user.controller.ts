import { UserService } from '@/domain/services/user.service';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/users/create-user.dto';
import { SERVICES } from '@/constants';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: UserService
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
  async create(@Body() data: CreateUserDTO) {
    console.log("🚀 ~ UserController ~ create ~ data:", data)
    return this.userService.create(data);
  }
}

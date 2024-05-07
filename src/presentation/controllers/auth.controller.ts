import { CreateUserDTO, SigninDTO } from '@/core/dtos';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'services/auth.service';
import { PublicRoute } from 'shared/decorators';


@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  @PublicRoute()
  async signup(@Body() data: CreateUserDTO) {
    return this.authService.signup(data);
  }

  @Post('/signin')
  @PublicRoute()
  async signin(@Body() data: SigninDTO) {
    return this.authService.signin(data);
  }
}

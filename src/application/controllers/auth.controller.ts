import { REPOSITORIES, SERVICES } from '@/constants';
import { AuthService } from '@/domain/services';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos';
import { SigninDTO } from '../dtos/auth/signin.dto';
import { PublicRoute } from '../decorators';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: AuthService
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

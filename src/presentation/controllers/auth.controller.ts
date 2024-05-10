import { CreateUserDTO, SigninDTO } from '@/core/dtos';
import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { ControllerResponse } from 'presentation/response';
import { AuthService } from 'services/auth.service';
import { PublicRoute } from 'shared/decorators';


@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Get('/identity-check')
  @PublicRoute()
  async identityCheck(
    @Query('email') email?: string,
    @Query('mobile_phone') mobile_phone?: string,
  ) {
    return ControllerResponse.build({
      data: await this.authService.identityCheck({
        email,
        mobile_phone,
      })
    });
  }

  @Post('/signup')
  @PublicRoute()
  async signup(@Body() data: CreateUserDTO) {
    return ControllerResponse.build({ data: await this.authService.signup(data) });
  }

  @Post('/signin')
  @PublicRoute()
  async signin(@Body() data: SigninDTO) {
    return ControllerResponse.build({ data: await this.authService.signin(data) });
  }
}

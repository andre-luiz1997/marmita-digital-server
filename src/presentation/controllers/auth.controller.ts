import { CreateUserDTO, SigninDTO } from '@/core/dtos';
import { Controller, Post, Body, Query, Get, Req, ParseBoolPipe } from '@nestjs/common';
import { ControllerResponse } from 'presentation/response';
import { AuthService } from 'services/auth.service';
import { PublicRoute } from 'shared/decorators';
import { CustomRequest } from 'shared/types';


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
    @Query('isTenantAdmin') isTenantAdmin: any = false,
  ) {
    if(typeof isTenantAdmin === 'string') isTenantAdmin = isTenantAdmin === 'true';
    return ControllerResponse.build({
      data: await this.authService.identityCheck({
        email,
        mobile_phone,
        isTenantAdmin
      })
    });
  }

  @Post('/signup')
  @PublicRoute()
  async signup(
    @Req() req: CustomRequest,
    @Body() data: CreateUserDTO
  ) {
    if(req.tenant) {
      data.tenant = req.tenant;
    }
    return ControllerResponse.build({ data: await this.authService.signup(data) });
  }

  @Post('/signin')
  @PublicRoute()
  async signin(
    @Req() req: CustomRequest,
    @Body() data: SigninDTO) {
    if(req.tenant) {
      data.tenant = req.tenant;
    }
    return ControllerResponse.build({ data: await this.authService.signin(data) });
  }
}

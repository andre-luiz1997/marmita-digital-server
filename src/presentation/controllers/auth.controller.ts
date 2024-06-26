import { CreateUserDTO, SigninDTO } from '@/core/dtos';
import { GROUP_PERMISSIONS } from '@/permissions';
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

  @Get('permissions')
  async getPermissions(
    @Req() req: CustomRequest,
  ) {
    const user = req.user;
    return ControllerResponse.build({
      data: GROUP_PERMISSIONS[user.group]
    });
  }

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

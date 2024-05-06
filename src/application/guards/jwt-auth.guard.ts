import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, SERVICES } from '@/constants';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { UserService } from '@/domain/services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private reflector: Reflector,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(SERVICES.USER) private userService: UserService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (token) {
      request.user = await this.authenticate(token);
    }
    if (!request.user && !isPublic) throw new UnauthorizedException();
    return true;
  }

  private async authenticate(token: string) {
    try {
      const bearer = token.split('Bearer ')[1];
      const payload = await this.jwtService.verify(bearer);
      return this.userService.findById(payload.id);
    } catch (error) {
      return null;
    }
  }
}

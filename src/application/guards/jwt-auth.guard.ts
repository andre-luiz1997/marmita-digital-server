import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, REPOSITORIES } from '@/constants';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { UserService } from '@/domain/services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private reflector: Reflector,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(REPOSITORIES.USER) private userService: UserService,
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

  private authenticate(token: string) {
    try {
      const [type,bearer] = token.split(' ') ?? [];
      const payload = this.jwtService.verify(type == 'Bearer' ? bearer : token);
      return this.userService.findById(payload._id);
    } catch (error) {
      return null;
    }
  }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '@/constants';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { UsersService } from '@/services/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UsersService,
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
      const [type, bearer] = token.split(' ') ?? [];
      const payload = this.jwtService.verify(type == 'Bearer' ? bearer : token, {
        secret: process.env.JWT_SECRET
      });
      return this.userService.findOneById(payload._id);
    } catch (error) {
      return null;
    }
  }
}

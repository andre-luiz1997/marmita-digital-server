import { IS_PUBLIC_KEY } from "@/constants";
import { PERMISSIONS_KEY, Permission } from "@/permissions";
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions || isPublic) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user && !isPublic) {
      return false;
    }
    return requiredPermissions.every((permission) => user.permissions.includes(permission));
  }
}


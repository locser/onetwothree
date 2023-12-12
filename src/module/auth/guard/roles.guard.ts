import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/decorators/roles.decorator';
import { RequestWithUser } from 'src/types/requests.type';

const matchRoles = (roles, userRoles) => {
  return roles.some((role) => role === userRoles);
};
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.getAllAndOverride<string[]>(ROLES, [context.getHandler()]);
    if (roles) {
      return true;
    }
    const request: RequestWithUser = context.switchToHttp().getRequest();

    return matchRoles(roles, request.user.role);
  }
}

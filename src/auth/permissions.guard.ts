import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { RequestWithUser } from '../auth/request-with-user.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
  const required = this.reflector.get<{ module: string; action: string }>(
    'permissions',
    context.getHandler(),
  );

  if (!required) return true;

  const request = context.switchToHttp().getRequest<RequestWithUser>();
  const user = request.user;

  if (user.isSuperAdmin) return true;

  const userPerm = user.permissions || {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const modulePerm = userPerm[required.module];

  if (!modulePerm) return false;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return modulePerm[required.action] === true;
}


}

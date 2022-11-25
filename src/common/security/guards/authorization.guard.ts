import { WebSocket } from 'ws';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { JwtDto } from 'src/common/dto';
import { Authenticated } from 'src/common/types';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  hasPermissions(user: JwtDto, requiredPermissions: string[]): boolean {
    const permissions = user?.permissions ?? '';
    const userPermissions = permissions.split(',');

    return requiredPermissions.every((reqPerm) =>
      userPermissions.some((userPerm: string) => reqPerm == userPerm));
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('security:permissions', [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredPermissions)
      return true;

    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest<Authenticated<Request>>();
      return this.hasPermissions(request.user, requiredPermissions);
    }

    if (context.getType() === 'ws') {
      const client = context.switchToWs().getClient<Authenticated<WebSocket>>();
      return this.hasPermissions(client.user, requiredPermissions);
    }

    return false;
  }

}

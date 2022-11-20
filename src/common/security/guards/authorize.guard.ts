import { WebSocket } from 'ws';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';

@Injectable()
export class AuthorizeGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPerms = this.reflector.getAllAndOverride<string[]>('security:permissions', [
      ctx.getHandler(),
      ctx.getClass()
    ]);

    if (!requiredPerms)
      return true;

    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest<Request>();

      const user = request.user as any;

      //The descriptor is the array of Permissions of user in number format
      const userPerms = user?.permissions;

      return requiredPerms.every((reqPerm) =>
        userPerms.some((userPerm: string) => reqPerm == userPerm));
    }
    else if (ctx.getType() === 'ws') {
      const client = ctx.switchToWs().getClient<WebSocket>();

      //By default, currently the WebSocket connection is not authenticated
      return true;
    }

    return false;
  }

}

import { WebSocket } from 'ws';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Access } from 'src/common/security/access';
import { parseDescriptor } from 'src/common/security/parser';

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
      const request = ctx.switchToHttp().getRequest();

      //The descriptor is the array of Permissions of user in number format
      const userPerms = parseDescriptor(request.user?.descriptor, Access);

      return requiredPerms.every((reqPerm) =>
        userPerms.some((userPerm) => reqPerm == userPerm));
    }
    else if (ctx.getType() === 'ws') {
      const client = ctx.switchToWs().getClient<WebSocket>();

      //By default, currently the WebSocket connection is not authenticated
      return true;
    }

    return false;
  }

}

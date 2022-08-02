import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Access } from 'src/common/security/access';
import { parseDescriptor } from 'src/common/security/parser';

@Injectable()
export class AuthorizeGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPerms = this.reflector.getAllAndOverride<string[]>('security:permissions', [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredPerms)
      return true;

    const { user } = context.switchToHttp().getRequest();

    //The descriptor is the array of Permissions of user in number format
    const userPerms = parseDescriptor(user?.descriptor, Access);

    return requiredPerms.every((reqPerm) => 
      userPerms.some((userPerm) => reqPerm == userPerm));
  }
  
}

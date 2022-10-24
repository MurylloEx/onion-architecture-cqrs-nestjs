import { Observable } from 'rxjs';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, Provider } from '@nestjs/common';

@Injectable()
export class JwtAuthorizeGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err) throw err;
    return user;
  }

}

export const JwtAuthorizeProvider: Provider = {
  provide: APP_GUARD,
  useClass: JwtAuthorizeGuard
};

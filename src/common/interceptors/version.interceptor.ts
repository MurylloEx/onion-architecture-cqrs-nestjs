import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { compare } from 'compare-versions';

import { 
  CallHandler, 
  ExecutionContext, 
  GoneException, 
  Injectable, 
  NestInterceptor
} from '@nestjs/common';

import { ConfigurationService } from 'src/common/services';

@Injectable()
export class VersionInterceptor implements NestInterceptor {

  constructor(
    protected readonly configurationService: ConfigurationService,
    private readonly reflector: Reflector
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isIgnored = this.reflector.getAllAndOverride<boolean>('aop:ignore-app-version', [
      context.getHandler(),
      context.getClass()
    ]);

    if (isIgnored) {
      return next.handle();
    }

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const clientVersion = request.get('x-app-version');
    const clientRequiredVersion = this.configurationService.app.minimumVersion;

    if (clientVersion && compare(clientVersion, clientRequiredVersion, '>=')){
      return next.handle();
    }

    throw new GoneException('A versão atual do app que você está utilizando está desatualizada.');
  }

}

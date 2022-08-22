import { Request } from 'express';
import { Observable } from 'rxjs';
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
    protected readonly configurationService: ConfigurationService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
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

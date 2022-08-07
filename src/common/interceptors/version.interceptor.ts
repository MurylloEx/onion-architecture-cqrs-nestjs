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

@Injectable()
export class VersionInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const clientVersion = request.get('x-app-version');
    const clientRequiredVersion = '0.0.0'; //Change this version to dotenv MINIMUM_APP_VERSION

    if (clientVersion && compare(clientVersion, clientRequiredVersion, '>=')){
      return next.handle();
    }

    throw new GoneException('A versão atual do app que você está utilizando está desatualizada.');
  }

}

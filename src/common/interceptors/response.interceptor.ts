import { extension } from 'mime-types';
import { Observable, map } from 'rxjs';
import { Request, Response } from 'express';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const acceptExtension = extension(request.get('accept')) || 'json';

    if (acceptExtension != 'json') {
      return next.handle();
    }

    return next.handle().pipe(map(payload => {
      return {
        timestamp: new Date(),
        path: request.path,
        error: false,
        status: response.statusCode,
        code: 'status_success',
        payload
      }
    }));
  }

}

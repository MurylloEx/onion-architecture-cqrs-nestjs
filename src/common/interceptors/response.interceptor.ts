import { extension } from 'mime-types';
import { Observable, map } from 'rxjs';
import { Request, Response } from 'express';
import { Reflector } from '@nestjs/core';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  constructor(private readonly reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isIgnored = this.reflector.getAllAndOverride<boolean>('aop:ignore-response-default', [
      context.getHandler(),
      context.getClass()
    ]);

    if (isIgnored) {
      return next.handle();
    }
    
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

import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError
} from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException
} from '@nestjs/common';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

  private readonly logger = new Logger(TimeoutError.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(timeout(25000), catchError(error => {
      if (error instanceof TimeoutError) {
        this.logger.warn(`One request took too long to complete for route [${request.url}]`);
        return throwError(() => new RequestTimeoutException('A solicitação demorou muito tempo para responder!'));
      }

      return throwError(() => error);
    }));
  }

}

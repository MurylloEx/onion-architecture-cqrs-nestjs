import { snakeCase } from 'lodash';
import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter
} from '@nestjs/common';

import { DomainException } from 'src/domain';
import { LoggingService } from 'src/common/services';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter<DomainException> {

  constructor(private readonly logger: LoggingService) { }

  getExceptionName(exception: DomainException) {
    return snakeCase('StatusDomain' + exception.name).toLowerCase();
  }

  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const payload = <any>exception.getResponse();

    delete payload.statusCode;

    this.logger.warning(
      'A domain exception has detected.', 
      'This is not neccessarily a back-end error, ' +
      'but a business logic exception.', 
      payload
    );

    response.status(status).json({
      timestamp: new Date(),
      path: request.url,
      error: true,
      status: status,
      code: this.getExceptionName(exception),
      payload
    });
  }

}

import { snakeCase } from 'lodash';
import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter
} from '@nestjs/common';

import { LoggingService } from 'src/common/services';

@Catch(Error)
export class HardErrorFilter implements ExceptionFilter<Error> {

  constructor(private readonly logger: LoggingService) { }

  getExceptionName(exception: Error) {
    return snakeCase('StatusFatal' + exception.name).toLowerCase();
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error('A fatal server error occurred.', exception);

    response.status(500).json({
      timestamp: new Date(),
      path: request.url,
      error: true,
      status: 500,
      code: this.getExceptionName(exception),
      payload: null
    });
  }

}

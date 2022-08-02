import { snakeCase } from 'lodash';
import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch(Error)
export class HardErrorFilter implements ExceptionFilter<Error> {

  private readonly logger = new Logger(HardErrorFilter.name);

  getExceptionName(exception: Error) {
    return snakeCase('StatusFatal' + exception.name).toLowerCase();
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    
    this.logger.error(exception.message, exception.stack, exception.name);

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

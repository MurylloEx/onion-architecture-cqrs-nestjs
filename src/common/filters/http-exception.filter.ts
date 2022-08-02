import { snakeCase } from 'lodash';
import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  
  private readonly logger = new Logger(HttpExceptionFilter.name);

  getExceptionName(exception: HttpException) {
    return snakeCase('StatusHttp' + exception.name).toLowerCase();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const payload = <any>exception.getResponse();

    delete payload.statusCode;

    if (status >= 500 && status <= 599){
      this.logger.error(exception.message, exception.stack, exception.name);
    }

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

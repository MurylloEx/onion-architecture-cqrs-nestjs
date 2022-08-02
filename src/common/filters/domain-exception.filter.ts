import { snakeCase } from 'lodash';
import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { DomainException } from 'src/domain';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter<DomainException> {

  private readonly logger = new Logger(DomainExceptionFilter.name);

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

    this.logger.error(exception.message, exception.stack, exception.name);

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

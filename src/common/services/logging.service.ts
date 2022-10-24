import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Logging, LoggingDomainService } from 'src/domain';

@Injectable()
export class LoggingService {

  constructor(private readonly loggingDomainService: LoggingDomainService) {}

  debug<T>(message: string, description: string, object: T): void {
    this.loggingDomainService.debug<T>(message, description, object);
  }

  error(message: string, error: Error): void {
    this.loggingDomainService.error(message, error);
  }

  info(message: string, description: string): void {
    this.loggingDomainService.info(message, description);
  }

  silly(message: string, description: string): void {
    this.loggingDomainService.silly(message, description);
  }

  verbose<T>(message: string, description: string, object: T): void {
    this.loggingDomainService.verbose<T>(message, description, object);
  }

  warning<T>(message: string, description: string, object: T): void {
    this.loggingDomainService.warning<T>(message, description, object);
  }

  deploySuccess(): void {
    this.loggingDomainService.deploySuccess();
  }

  deployFailed(error: Error): void {
    this.loggingDomainService.deployFailed(error);
  }

  fetch(options?: FindManyOptions<Logging>): Promise<Logging[]> {
    return this.loggingDomainService.fetch(options);
  }

}

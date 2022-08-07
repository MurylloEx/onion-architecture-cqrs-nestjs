import { ICommand } from '@nestjs/cqrs';
import { LoggingType } from 'src/domain/business/slices/logging/types';

export class CreateLoggingCommand<T> implements ICommand {
  constructor(
    public readonly type: LoggingType,
    public readonly serviceName: string,
    public readonly message: string,
    public readonly description: string,
    public readonly object?: T,
    public readonly error?: Error
  ) {}
}

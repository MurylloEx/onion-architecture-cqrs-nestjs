import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Logging } from 'src/domain/business/slices/logging/models';
import { CreateLoggingCommand } from 'src/domain/business/slices/logging/commands';
import { LoggingRepository } from 'src/domain/business/slices/logging/repositories';

@CommandHandler(CreateLoggingCommand)
export class CreateLoggingHandler<T> implements ICommandHandler<CreateLoggingCommand<T>> {

  constructor(
    private readonly repository: LoggingRepository
  ) {}

  async execute(command: CreateLoggingCommand<T>): Promise<Logging> {
    const errorPropertyNames = Object.getOwnPropertyNames(command.error ?? {}); 
    const errorJson = JSON.stringify(command.error, errorPropertyNames) ?? '';
    const contentJson = JSON.stringify(command.object) ?? '';

    return await this.repository.create(
      command.type,
      command.serviceName,
      command.message, 
      command.description,
      contentJson,
      errorJson
    );
  }

}

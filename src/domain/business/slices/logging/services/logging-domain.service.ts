import { FindManyOptions } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';

import { ServerConfig, ServerConfigType } from 'src/domain/config';
import { Logging } from 'src/domain/business/slices/logging/models';
import { LoggingType } from 'src/domain/business/slices/logging/types';
import { FetchLoggingsQuery } from 'src/domain/business/slices/logging/queries';
import { CreateLoggingCommandBuilder } from 'src/domain/business/slices/logging/commands';

import { DiscordLoggingDomainService } from './discord-logging-domain.service';
 
@Injectable()
export class LoggingDomainService {

  constructor(
    @Inject(ServerConfig.KEY)
    private readonly serverConfig: ServerConfigType,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly discordLoggingDomainService: DiscordLoggingDomainService
  ) { }

  debug<T>(message: string, description: string, object: T): void {
    if (!this.serverConfig.debug)
      return;

    const command = new CreateLoggingCommandBuilder<T>()
      .withType(LoggingType.Debug)
      .withServiceName(this.serverConfig.name)
      .withMessage(message)
      .withObject(object)
      .build();

    this.discordLoggingDomainService.debug<T>(message, description, object);
    this.commandBus.execute<ICommand, Logging>(command);
  }

  error(message: string, error: Error): void {
    if (!this.serverConfig.debug)
      return;

    const command = new CreateLoggingCommandBuilder<any>()
      .withType(LoggingType.Error)
      .withServiceName(this.serverConfig.name)
      .withMessage(message)
      .withError(error)
      .withDescription(error.message)
      .build();

    this.discordLoggingDomainService.error(message, error);
    this.commandBus.execute<ICommand, Logging>(command);
  }

  info(message: string, description: string): void {
    if (!this.serverConfig.debug)
      return;

    const command = new CreateLoggingCommandBuilder<any>()
      .withType(LoggingType.Info)
      .withServiceName(this.serverConfig.name)
      .withMessage(message)
      .withDescription(description)
      .build();

    this.discordLoggingDomainService.info(message, description);
    this.commandBus.execute<ICommand, Logging>(command);
  }

  silly(message: string, description: string): void {
    if (!this.serverConfig.debug)
      return;

    const command = new CreateLoggingCommandBuilder<any>()
      .withType(LoggingType.Error)
      .withServiceName(this.serverConfig.name)
      .withMessage(message)
      .withDescription(description)
      .build();

    this.discordLoggingDomainService.silly(message, description);
    this.commandBus.execute<ICommand, Logging>(command);
  }

  verbose<T>(message: string, description: string, object: T): void {
    if (!this.serverConfig.debug)
      return;

    const command = new CreateLoggingCommandBuilder<T>()
      .withType(LoggingType.Verbose)
      .withServiceName(this.serverConfig.name)
      .withMessage(message)
      .withDescription(description)
      .build();

    this.discordLoggingDomainService.verbose(message, description, object);
    this.commandBus.execute<ICommand, Logging>(command);
  }

  warning<T>(message: string, description: string, object: T): void {
    if (!this.serverConfig.debug)
      return;

    const command = new CreateLoggingCommandBuilder<T>()
      .withType(LoggingType.Warning)
      .withServiceName(this.serverConfig.name)
      .withMessage(message)
      .withDescription(description)
      .withObject(object)
      .build();

    this.discordLoggingDomainService.warning(message, description);
    this.commandBus.execute<ICommand, Logging>(command);
  }

  deploySuccess(): void {
    if (!this.serverConfig.debug)
      return;

    this.discordLoggingDomainService.deploySuccess();
  }

  deployFailed(error: Error): void {
    if (!this.serverConfig.debug)
      return;

    this.discordLoggingDomainService.deployFailed(error);
  }

  fetch(options?: FindManyOptions<Logging>): Promise<Logging[]> {
    const query = new FetchLoggingsQuery(options);
    return this.queryBus.execute<IQuery, Logging[]>(query);
  }

}

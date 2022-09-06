import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';

import { Logging } from 'src/domain/business/slices/logging/models';
import { LoggingType } from 'src/domain/business/slices/logging/types';
import { FetchLoggingsQuery } from 'src/domain/business/slices/logging/queries';
import { ConfigurationDomainService, ServerConfigType } from 'src/domain/config';
import { CreateLoggingCommandBuilder } from 'src/domain/business/slices/logging/commands';

import { DiscordLoggingDomainService } from './discord-logging-domain.service';
 
@Injectable()
export class LoggingDomainService {

  private readonly serverConfig: ServerConfigType;

  constructor(
    protected readonly commandBus: CommandBus,
    protected readonly queryBus: QueryBus,
    protected readonly configurationDomainService: ConfigurationDomainService,
    protected readonly discordLoggingDomainService: DiscordLoggingDomainService
  ) 
  {
    this.serverConfig = configurationDomainService.server;
  }

  debug<T>(message: string, description: string, object: T): void {
    if (!this.serverConfig.debug)
      return;

    const command = new CreateLoggingCommandBuilder<T>()
      .withType(LoggingType.Debug)
      .withServiceName(this.serverConfig.name)
      .withDescription(description)
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
      .withObject(object)
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

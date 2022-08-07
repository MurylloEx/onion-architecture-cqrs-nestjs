import DiscordLogger from 'node-discord-logger';
import { Inject, Injectable } from '@nestjs/common';
import { hostname, arch, endianness, type, version } from 'os';

import { 
  DiscordConfig, 
  DiscordConfigType, 
  RootConfig, 
  RootConfigType, 
  ServerConfig, 
  ServerConfigType 
} from 'src/domain/config';

import { MetaType } from 'src/domain/business/slices/logging/types';

@Injectable()
export class DiscordLoggingDomainService {

  private readonly deployLogger: DiscordLogger;
  private readonly commonLogger: DiscordLogger;
  private readonly metadata: MetaType;

  constructor(
    @Inject(RootConfig.KEY)
    protected readonly rootConfig: RootConfigType,
    @Inject(ServerConfig.KEY)
    protected readonly serverConfig: ServerConfigType,
    @Inject(DiscordConfig.KEY)
    protected readonly discordConfig: DiscordConfigType
  ) {
    const settings = {
      icon: discordConfig.iconUrl,
      serviceName: serverConfig.name,
      defaultMeta: {
        'Process ID': process.pid,
        'Host': hostname(),
        'Arch': arch(),
        'Endianness': endianness(),
        'OS/Kernel': `${type()}/${version()}`
      }
    };

    this.metadata = {
      'Environment': this.rootConfig.environment,
      'Server Host': this.serverConfig.host,
      'Server Port': this.serverConfig.port,
      'Server Version': this.serverConfig.version
    };

    this.deployLogger = new DiscordLogger({
      hook: discordConfig.webhook.deployUrl,
      ...settings
    });

    this.commonLogger = new DiscordLogger({
      hook: discordConfig.webhook.commonUrl,
      ...settings
    });
  }

  debug<T>(message: string, description: string, object?: T): Promise<void> {
    return this.commonLogger.debug({
      message,
      description,
      json: object,
      meta: this.metadata
    })
  }

  error<T extends Error>(message: string, error: T): Promise<void> {
    return this.commonLogger.error({
      message,
      error,
      meta: this.metadata
    });
  }

  info(message: string, description: string): Promise<void> {
    return this.commonLogger.info({
      message,
      description
    });
  }

  silly(message: string, description: string): Promise<void> {
    return this.commonLogger.silly({
      message,
      description,
      meta: this.metadata
    });
  }

  verbose<T>(message: string, description: string, object?: T, meta?: MetaType): Promise<void> {
    return this.commonLogger.verbose({
      message,
      description,
      json: object,
      meta
    });
  }

  warning<T>(message: string, description: string, object?: T): Promise<void> {
    return this.commonLogger.warn({
      message,
      description,
      json: object,
      meta: this.metadata
    });
  }

  deploySuccess(): Promise<void> {
    return this.deployLogger.debug({
      message: 'NestJS application was deployed successfully on port ' + this.serverConfig.port + '.',
      meta: this.metadata
    });
  }

  deployFailed(error: Error): Promise<void> {
    return this.deployLogger.error({
      message: 'NestJS application was failed to deploy on port ' + this.serverConfig.port + '.',
      error,
      meta: this.metadata
    });
  }

}

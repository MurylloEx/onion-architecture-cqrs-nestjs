import { StoreConfig } from 'cache-manager';
import { JwtModuleOptions } from '@nestjs/jwt';
import { DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CacheModuleOptions, Inject, Injectable } from '@nestjs/common';

import {
  CacheConfig,
  CompressionConfig,
  DatabaseConfig,
  OasConfig,
  RootConfig,
  SecurityConfig,
  ServerConfig,
  SmtpConfig
} from 'src/domain';

import {
  CacheConfigType,
  CompressionConfigType,
  DatabaseConfigType,
  OasConfigType,
  RootConfigType,
  SecurityConfigType,
  ServerConfigType,
  SmtpConfigType
} from 'src/domain';

import {
  Bucket,
  Logging,
  Message,
  User
} from 'src/domain';

import {
  CreateLoggingTableMigration1660625313012,
  CreateMessageTableMigration1659920828672,
  CreateBucketTableMigration1660506725676,
  CreateUserTableMigration1660624358399
} from 'src/domain';

@Injectable()
export class ConfigurationService {

  constructor(
    @Inject(CacheConfig.KEY)
    public readonly cache: CacheConfigType,
    @Inject(CompressionConfig.KEY)
    public readonly compression: CompressionConfigType,
    @Inject(DatabaseConfig.KEY)
    public readonly database: DatabaseConfigType,
    @Inject(OasConfig.KEY)
    public readonly oas: OasConfigType,
    @Inject(RootConfig.KEY)
    public readonly root: RootConfigType,
    @Inject(SecurityConfig.KEY)
    public readonly security: SecurityConfigType,
    @Inject(ServerConfig.KEY)
    public readonly server: ServerConfigType,
    @Inject(SmtpConfig.KEY)
    public readonly smtp: SmtpConfigType
  ) { }

  configureServerGlobalPrefix(): string {
    return this.server.globalPrefix;
  }

  configureServerPort(): number {
    return this.server.port;
  }

  configureSwaggerPath(): string {
    return this.oas.path;
  }

  configureSwagger(): DocumentBuilder {
    return new DocumentBuilder()
      .addTag(this.oas.tag)
      .addBearerAuth()
      .addSecurity('X-App-Version', {
        type: 'apiKey',
        in: 'header',
        name: 'x-app-version',
      })
      .addSecurityRequirements('X-App-Version', ['x-app-version'])
      .setTitle(this.oas.title)
      .setDescription(this.oas.description)
      .setVersion(this.oas.version)
      .setLicense(
        this.oas.license.name,
        this.oas.license.website
      )
      .setContact(
        this.oas.contact.author.name,
        this.oas.contact.author.website,
        this.oas.contact.author.email
      );
  }

  configureCors() {
    return {
      origin: this.security.cors.origin,
      maxAge: this.security.cors.maxAge,
    };
  }

  configureCompression() {
    return {
      level: this.compression.level,
      memLevel: this.compression.memoryLevel
    };
  }

  configureThrottler(): ThrottlerModuleOptions {
    return {
      ttl: this.security.throttler.ttl,
      limit: this.security.throttler.limit
    };
  }

  configureJwt(): JwtModuleOptions {
    return {
      secret: this.security.jwt.symmetricKey
    };
  }

  configureEntities(): Function[] {
    return [
      Bucket,
      Logging,
      Message,
      User
    ];
  }

  configureMigrations(): Function[] {
    return [
      CreateBucketTableMigration1660506725676,
      CreateLoggingTableMigration1660625313012,
      CreateMessageTableMigration1659920828672,
      CreateUserTableMigration1660624358399
    ];
  }

  configureTypeOrm(): TypeOrmModuleOptions {
    return {
      type: this.database.type,
      database: <any>this.database.storage,
      synchronize: this.database.synchronize,
      logging: this.database.logging,
      migrationsRun: this.database.migrationsEnable,
      migrationsTableName: this.database.migrationsTable,
      namingStrategy: new SnakeNamingStrategy(),
      entities: this.configureEntities(),
      migrations: this.configureMigrations()
    };
  }

  configureCache(): Partial<CacheModuleOptions<StoreConfig>> {
    return {
      ttl: this.cache.ttl,
      max: this.cache.max
    };
  }

}

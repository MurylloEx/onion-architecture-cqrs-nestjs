import { StoreConfig } from 'cache-manager';
import { JwtModuleOptions } from '@nestjs/jwt';
import { DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CacheModuleOptions, Inject, Injectable } from '@nestjs/common';

import {
  AppConfig,
  BucketConfig,
  CacheConfig,
  CompressionConfig,
  DatabaseConfig,
  DiscordConfig,
  DiscordConfigType,
  OasConfig,
  RootConfig,
  SecurityConfig,
  ServerConfig,
  SmtpConfig
} from 'src/domain/config/slices';

import {
  AppConfigType,
  BucketConfigType,
  CacheConfigType,
  CompressionConfigType,
  DatabaseConfigType,
  OasConfigType,
  RootConfigType,
  SecurityConfigType,
  ServerConfigType,
  SmtpConfigType
} from 'src/domain/config/slices';

import {
  Authentication,
  Bucket,
  Logging,
  Message,
  Confirmation,
  Recovery,
  User,
  Pet,
  Establishment,
  Post,
  PostFilterRule
} from 'src/domain/business';

import {
  CreateLoggingTableMigration1660625313012,
  CreateMessageTableMigration1659920828672,
  CreateBucketTableMigration1660506725676,
  CreateUserTableMigration1660624358399,
  AddConfirmationForeignKeyToUserTable1660780764696,
  CreateAuthenticationTableMigration1660780461390,
  CreateConfirmationTableMigration1660780443848,
  CreateRecoveryTableMigration1660780424112
} from 'src/domain/business';

@Injectable()
export class ConfigurationDomainService {

  constructor(
    @Inject(AppConfig.KEY)
    public readonly app: AppConfigType,
    @Inject(BucketConfig.KEY)
    public readonly bucket: BucketConfigType,
    @Inject(CacheConfig.KEY)
    public readonly cache: CacheConfigType,
    @Inject(DiscordConfig.KEY)
    public readonly discord: DiscordConfigType,
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
      .addSecurity('Authorization', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'authorization',
        description: 'The bearer token in JWT format.'
      })
      .addSecurity('X-App-Version', {
        type: 'apiKey',
        in: 'header',
        name: 'x-app-version',
        description: 'The current acceptable app version'
      })
      .addSecurityRequirements('Authorization', ['authorization'])
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
      secret: this.security.jwt.symmetricKey,
      signOptions: {
        issuer: this.security.jwt.issuer,
        expiresIn: this.security.jwt.expiration
      }
    };
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

  configureEntities(): Function[] {
    return [
      Authentication,
      Bucket,
      Confirmation,
      Establishment,
      Logging,
      Message,
      User,
      Recovery,
      Pet,
      Post,
      PostFilterRule,
    ];
  }

  configureMigrations(): Function[] {
    return [
      CreateBucketTableMigration1660506725676,
      CreateLoggingTableMigration1660625313012,
      CreateMessageTableMigration1659920828672,
      CreateUserTableMigration1660624358399,
      CreateAuthenticationTableMigration1660780461390,
      CreateConfirmationTableMigration1660780443848,
      CreateRecoveryTableMigration1660780424112,
      AddConfirmationForeignKeyToUserTable1660780764696
    ];
  }

}

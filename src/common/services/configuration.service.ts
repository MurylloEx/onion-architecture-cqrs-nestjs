import { StoreConfig } from 'cache-manager';
import { JwtModuleOptions } from '@nestjs/jwt';
import { DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { CacheModuleOptions, Injectable } from '@nestjs/common';

import { ConfigurationDomainService } from 'src/domain';

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
} from 'src/domain';

@Injectable()
export class ConfigurationService {

  constructor(
    private readonly configurationDomainService: ConfigurationDomainService
  ) { }

  get app(): AppConfigType {
    return this.configurationDomainService.app;
  }

  get bucket(): BucketConfigType {
    return this.configurationDomainService.bucket;
  }

  get cache(): CacheConfigType {
    return this.configurationDomainService.cache;
  }

  get compression(): CompressionConfigType {
    return this.configurationDomainService.compression;
  }

  get database(): DatabaseConfigType {
    return this.configurationDomainService.database;
  }

  get oas(): OasConfigType {
    return this.configurationDomainService.oas;
  }

  get root(): RootConfigType {
    return this.configurationDomainService.root;
  }

  get security(): SecurityConfigType {
    return this.configurationDomainService.security;
  }

  get server(): ServerConfigType {
    return this.configurationDomainService.server;
  }

  get smtp(): SmtpConfigType {
    return this.configurationDomainService.smtp;
  }

  configureServerGlobalPrefix(): string {
    return this.configurationDomainService.configureServerGlobalPrefix();
  }

  configureServerPort(): number {
    return this.configurationDomainService.configureServerPort()
  }

  configureSwaggerPath(): string {
    return this.configurationDomainService.configureSwaggerPath();
  }

  configureSwagger(): DocumentBuilder {
    return this.configurationDomainService.configureSwagger();
  }

  configureCors() {
    return this.configurationDomainService.configureCors();
  }

  configureCompression() {
    return this.configurationDomainService.configureCompression();
  }

  configureThrottler(): ThrottlerModuleOptions {
    return this.configurationDomainService.configureThrottler();
  }

  configureJwt(): JwtModuleOptions {
    return this.configurationDomainService.configureJwt();
  }

  configureTypeOrm(): TypeOrmModuleOptions {
    return this.configurationDomainService.configureTypeOrm();
  }

  configureCache(): Partial<CacheModuleOptions<StoreConfig>> {
    return this.configurationDomainService.configureCache();
  }

  configureEntities(): Function[] {
    return this.configurationDomainService.configureEntities();
  }

  configureMigrations(): Function[] {
    return this.configurationDomainService.configureMigrations();
  }

}

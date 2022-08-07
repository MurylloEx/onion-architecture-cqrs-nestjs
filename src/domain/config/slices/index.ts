import { CacheConfig } from './cache.config';
import { CompressionConfig } from './compression.config';
import { DatabaseConfig } from './database.config';
import { DiscordConfig } from './discord.config';
import { OasConfig } from './oas.config';
import { RootConfig } from './root.config';
import { SecurityConfig } from './security.config';
import { ServerConfig } from './server.config';
import { SmtpConfig } from './smtp.config';

export * from './cache.config';
export * from './compression.config';
export * from './database.config';
export * from './discord.config';
export * from './oas.config';
export * from './root.config';
export * from './security.config';
export * from './server.config';
export * from './smtp.config';

export const ConfigSlices = [
  CacheConfig,
  CompressionConfig,
  DatabaseConfig,
  DiscordConfig,
  OasConfig,
  RootConfig,
  SecurityConfig, 
  ServerConfig,
  SmtpConfig
];

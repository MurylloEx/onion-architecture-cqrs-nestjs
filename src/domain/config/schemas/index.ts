import * as Joi from 'joi';
import { ServerSchema } from './server.schema';
import { RootSchema } from './root.schema';
import { CacheSchema } from './cache.schema';
import { CompressionSchema } from './compression.schema';
import { DatabaseSchema } from './database.schema';
import { OasSchema } from './oas.schema';
import { SecuritySchema } from './security.schema';
import { DiscordSchema } from './discord.schema';
import { SmtpSchema } from './smtp.schema';

export * from './server.schema';
export * from './root.schema';
export * from './cache.schema';
export * from './compression.schema';
export * from './database.schema';
export * from './database.schema';
export * from './oas.schema';
export * from './security.schema';
export * from './smtp.schema';

export const ConfigSchema = Joi.object()
  .concat(CacheSchema)
  .concat(CompressionSchema)
  .concat(DatabaseSchema)
  .concat(DiscordSchema)
  .concat(OasSchema)
  .concat(RootSchema)
  .concat(SecuritySchema)
  .concat(ServerSchema)
  .concat(SmtpSchema);

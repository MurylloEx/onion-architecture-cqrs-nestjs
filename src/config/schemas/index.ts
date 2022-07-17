import * as Joi from 'joi';
import { ServerSchema } from './server.schema';
import { EnvironmentSchema } from './root.schema';

export * from './root.schema';
export * from './server.schema';

export const ConfigSchema = Joi.object()
  .concat(EnvironmentSchema)
  .concat(ServerSchema);

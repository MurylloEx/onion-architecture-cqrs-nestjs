import * as Joi from 'joi';

export const ServerSchema = Joi.object({
  SERVER_HOST: Joi.string().domain().allow('localhost').default('local'),
  SERVER_PORT: Joi.number().port().default(80),
  SERVER_GLOBAL_PREFIX: Joi.string().default(''),
  SERVER_NAME: Joi.string().default('NestJS Service'),
  SERVER_VERSION: Joi.string().pattern(new RegExp(/^\d+\.\d+\.\d+$/)).default('0.0.0'),
  SERVER_DEBUG: Joi.boolean().default(true)
});

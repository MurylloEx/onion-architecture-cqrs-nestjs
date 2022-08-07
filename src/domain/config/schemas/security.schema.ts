import * as Joi from 'joi';

export const SecuritySchema = Joi.object({
  SECURITY_THROTTLER_TTL: Joi.number().positive().default(16),
  SECURITY_THROTTLER_LIMIT: Joi.number().positive().default(64),
  SECURITY_CORS_ORIGIN: Joi.string().default('*'),
  SECURITY_CORS_MAX_AGE: Joi.number().positive().default(600),
  SECURITY_JWT_SYMMETRIC_KEY: Joi.string().default('secret'),
  SECURITY_JWT_IGNORE_EXPIRATION: Joi.boolean().default(true)
});

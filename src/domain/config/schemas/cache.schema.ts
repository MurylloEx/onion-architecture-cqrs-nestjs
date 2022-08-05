import * as Joi from 'joi';

export const CacheSchema = Joi.object({
  CACHE_TTL: Joi.number().positive().default(60),
  CACHE_MAX: Joi.number().positive().default(1024)
});

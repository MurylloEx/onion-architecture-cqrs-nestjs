import * as Joi from 'joi';

export const CompressionSchema = Joi.object({
  COMPRESSION_LEVEL: Joi.number().positive().default(1),
  COMPRESSION_MEMORY_LEVEL: Joi.number().positive().default(1)
});

import * as Joi from 'joi';

export const RootSchema = Joi.object({
  ENVIRONMENT: Joi.string()
    .valid('development', 'production', 'local', 'testing')
    .default('local')
});

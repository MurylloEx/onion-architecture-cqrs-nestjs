import * as Joi from 'joi';

export const EnvironmentSchema = Joi.object({
  ENVIRONMENT: Joi.string()
    .valid('development', 'production', 'local', 'testing')
    .default('local')
});


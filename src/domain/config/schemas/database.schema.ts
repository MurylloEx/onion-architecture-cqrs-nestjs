import * as Joi from 'joi';

export const DatabaseSchema = Joi.object({
  DATABASE_TYPE: Joi.string().default('sqlite'),
  DATABASE_STORAGE: Joi.string().default(':memory:'),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
  DATABASE_LOGGING: Joi.boolean().default(true),
  DATABASE_MIGRATIONS_ENABLE: Joi.boolean().default(false),
  DATABASE_MIGRATIONS_TABLE: Joi.string().default('migrations')
});

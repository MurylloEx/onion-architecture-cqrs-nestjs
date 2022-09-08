import * as Joi from 'joi';

export const AppSchema = Joi.object({
  APP_MINIMUM_VERSION: Joi.string().pattern(new RegExp(/^\d+\.\d+\.\d+$/)).default('0.0.0')
});

import * as Joi from 'joi';

export const ServerSchema = Joi.object({
  SMTP_KEY: Joi.string().pattern(/^api-\w{32}$/igm).default(`api-${'0'.repeat(32)}`),
  SMTP_FROM_NAME: Joi.string().default('Sender Name'),
  SMTP_FROM_EMAIL: Joi.string().email().default('noreply@example.com')
});

import * as Joi from 'joi';
 
export const SmtpSchema = Joi.object({
  SMTP_KEY: Joi.string().pattern(new RegExp(/^api-\w{32}$/)).required(),
  SMTP_FROM_NAME: Joi.string().default('Sender Name'),
  SMTP_FROM_EMAIL: Joi.string().email().default('noreply@example.com'),
  SMTP_SANDBOX: Joi.boolean().default(true)
});
 
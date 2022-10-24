import * as Joi from 'joi';

export const DiscordSchema = Joi.object({
  DISCORD_WEBHOOK_DEPLOY_URL: Joi.string().uri().default(''),
  DISCORD_WEBHOOK_COMMON_URL: Joi.string().uri().default(''),
  DISCORD_WEBHOOK_ICON_URL: Joi.string().uri().default('https://i.imgur.com/HQpCcFu.png')
});

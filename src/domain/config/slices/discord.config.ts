import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type DiscordWebhook = {
  deployUrl: string;
  commonUrl: string;
}

export type DiscordConfigSlice = {
  webhook: DiscordWebhook,
  iconUrl: string;
}

export const DISCORD_CONFIG = 'DISCORD_CONFIG';

export const DiscordConfig = registerAs<DiscordConfigSlice>(DISCORD_CONFIG, () => ({
  webhook: {
    deployUrl: cast(process.env.DISCORD_WEBHOOK_DEPLOY_URL, 'String'),
    commonUrl: cast(process.env.DISCORD_WEBHOOK_COMMON_URL, 'String')
  },
  iconUrl: cast(process.env.DISCORD_WEBHOOK_ICON_URL, 'String')
}));

export type DiscordConfigType = ConfigType<typeof DiscordConfig>;

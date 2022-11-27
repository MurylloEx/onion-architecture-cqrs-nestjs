import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type AppConfigSlice = {
  minimumVersion: string;
}

export const APP_CONFIG = 'APP_CONFIG';

export const AppConfig = registerAs<AppConfigSlice>(APP_CONFIG, () => ({
  minimumVersion: cast(process.env.APP_MINIMUM_VERSION, 'String')
}));

export type AppConfigType = ConfigType<typeof AppConfig>;

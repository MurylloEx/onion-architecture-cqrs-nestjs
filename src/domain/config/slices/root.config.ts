import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export enum Environment {
  dev = 'development',
  prod = 'production',
  local = 'local',
  test = 'testing'
}

export type RootConfigSlice = {
  environment: Environment;
}

export const ROOT_CONFIG = 'ROOT_CONFIG';

export const RootConfig = registerAs<RootConfigSlice>(ROOT_CONFIG, () => ({
  environment: cast(process.env.ENVIRONMENT, 'String')
}));

export type RootConfigType = ConfigType<typeof RootConfig>;
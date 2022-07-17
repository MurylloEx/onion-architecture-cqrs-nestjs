import { registerAs } from '@nestjs/config';

export enum EnvironmentEnum {
  dev = 'development',
  prod = 'production',
  local = 'local'
}

export type RootConfigType = {
  environment: EnvironmentEnum
}

export const ROOT_CONFIG = 'ROOT_CONFIG';

export const RootConfig = registerAs<RootConfigType>(ROOT_CONFIG, (): any => ({
  environment: process.env.ENVIRONMENT
}));

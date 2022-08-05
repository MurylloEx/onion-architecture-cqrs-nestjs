import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type ServerConfigSlice = {
  host: string;
  port: number;
  globalPrefix: string;
}

export const SERVER_CONFIG = 'SERVER_CONFIG';

export const ServerConfig = registerAs<ServerConfigSlice>(SERVER_CONFIG, (): any => ({
  host: cast(process.env.SERVER_HOST, 'String'),
  port: cast(process.env.SERVER_PORT, 'Number'),
  globalPrefix: cast(process.env.SERVER_GLOBAL_PREFIX, 'String')
}));

export type ServerConfigType = ConfigType<typeof ServerConfig>;

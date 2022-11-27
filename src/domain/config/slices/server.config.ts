import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type ServerConfigSlice = {
  host: string;
  port: number;
  globalPrefix: string;
  name: string;
  version: string;
  debug: boolean;
}

export const SERVER_CONFIG = 'SERVER_CONFIG';

export const ServerConfig = registerAs<ServerConfigSlice>(SERVER_CONFIG, () => ({
  host: cast(process.env.SERVER_HOST, 'String'),
  port: cast(process.env.SERVER_PORT, 'Number'),
  globalPrefix: cast(process.env.SERVER_GLOBAL_PREFIX, 'String'),
  name: cast(process.env.SERVER_NAME, 'String'),
  version: cast(process.env.SERVER_VERSION, 'String'),
  debug: cast(process.env.SERVER_DEBUG, 'Boolean')
}));

export type ServerConfigType = ConfigType<typeof ServerConfig>;

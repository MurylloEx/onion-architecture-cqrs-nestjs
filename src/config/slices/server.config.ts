import { registerAs } from '@nestjs/config';

export type ServerConfigType = {
  host: string;
  port: number;
}

export const SERVER_CONFIG = 'SERVER_CONFIG';

export const ServerConfig = registerAs<ServerConfigType>(SERVER_CONFIG, (): any => ({
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT
}));

import { ConfigType, registerAs } from '@nestjs/config';
import { DatabaseType } from 'typeorm';
import { cast } from 'typeable';

export type DatabaseConfigSlice = {
  type: DatabaseType;
  storage: string;
  synchronize: boolean;
  logging: boolean;
}

export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export const DatabaseConfig = registerAs<DatabaseConfigSlice>(DATABASE_CONFIG, (): any => ({
  type: cast(process.env.DATABASE_TYPE, 'String'),
  storage: cast(process.env.DATABASE_STORAGE, 'String'),
  synchronize: cast(process.env.DATABASE_SYNCHRONIZE, 'Boolean'),
  logging: cast(process.env.DATABASE_LOGGING, 'Boolean')
}));

export type DatabaseConfigType = ConfigType<typeof DatabaseConfig>;

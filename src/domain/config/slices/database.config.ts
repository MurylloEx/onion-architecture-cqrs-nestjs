import { ConfigType, registerAs } from '@nestjs/config';
import { DatabaseType } from 'typeorm';
import { cast } from 'typeable';

export type DatabaseConfigSlice = {
  type: DatabaseType;
  storage: string;
  synchronize: boolean;
  logging: boolean;
  migrationsEnable: boolean;
  migrationsTable: string;
}

export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export const DatabaseConfig = registerAs<DatabaseConfigSlice>(DATABASE_CONFIG, () => ({
  type: cast(process.env.DATABASE_TYPE, 'String'),
  storage: cast(process.env.DATABASE_STORAGE, 'String'),
  synchronize: cast(process.env.DATABASE_SYNCHRONIZE, 'Boolean'),
  logging: cast(process.env.DATABASE_LOGGING, 'Boolean'),
  migrationsEnable: cast(process.env.DATABASE_MIGRATIONS_ENABLE, 'Boolean'),
  migrationsTable: cast(process.env.DATABASE_MIGRATIONS_TABLE, 'String')
}));

export type DatabaseConfigType = ConfigType<typeof DatabaseConfig>;

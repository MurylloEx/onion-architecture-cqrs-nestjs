import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type CacheConfigSlice = {
  ttl: number;
  max: number;
}

export const CACHE_CONFIG = 'CACHE_CONFIG';

export const CacheConfig = registerAs<CacheConfigSlice>(CACHE_CONFIG, (): any => ({
  ttl: cast(process.env.CACHE_TTL, 'Number'),
  max: cast(process.env.CACHE_MAX, 'Number')
}));

export type CacheConfigType = ConfigType<typeof CacheConfig>;

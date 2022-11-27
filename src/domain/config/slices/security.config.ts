import { cast } from 'typeable';
import { ConfigType, registerAs } from '@nestjs/config';

export type SecurityThrottler = {
  ttl: number;
  limit: number;
}

export type SecurityCors = {
  origin: string;
  maxAge: number;
}

export type SecurityJwt = {
  symmetricKey: string;
  ignoreExpiration: boolean;
  issuer: string;
  expiration: string;
}

export type SecurityConfigSlice = {
  throttler: SecurityThrottler;
  cors: SecurityCors;
  jwt: SecurityJwt;
}

export const SECURITY_CONFIG = 'SECURITY_CONFIG';

export const SecurityConfig = registerAs<SecurityConfigSlice>(SECURITY_CONFIG, () => ({
  throttler: {
    ttl: cast(process.env.SECURITY_THROTTLER_TTL, 'Number'),
    limit: cast(process.env.SECURITY_THROTTLER_LIMIT, 'Number'),
  },
  cors: {
    origin: cast(process.env.SECURITY_CORS_ORIGIN, 'String'),
    maxAge: cast(process.env.SECURITY_CORS_MAX_AGE, 'Number')
  },
  jwt: {
    symmetricKey: cast(process.env.SECURITY_JWT_SYMMETRIC_KEY, 'String'),
    ignoreExpiration: cast(process.env.SECURITY_JWT_IGNORE_EXPIRATION, 'Boolean'),
    issuer: cast(process.env.SECURITY_JWT_ISSUER, 'String'),
    expiration: cast(process.env.SECURITY_JWT_EXPIRATION, 'String')
  }
}));

export type SecurityConfigType = ConfigType<typeof SecurityConfig>;
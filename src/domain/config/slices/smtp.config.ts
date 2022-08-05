import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type SmtpFrom = {
  name: string;
  email: string;
}

export type SmtpConfigSlice = {
  key: string;
  from: SmtpFrom;
}

export const SMTP_CONFIG = 'SMTP_CONFIG';

export const SmtpConfig = registerAs<SmtpConfigSlice>(SMTP_CONFIG, (): any => ({
  key: cast(process.env.SMTP_KEY, 'String'),
  from: {
    name: cast(process.env.SMTP_FROM_NAME, 'String'),
    email: cast(process.env.SMTP_FROM_EMAIL, 'String')
  }
}));

export type SmtpConfigType = ConfigType<typeof SmtpConfig>;

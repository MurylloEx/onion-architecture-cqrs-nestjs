import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type OasAuthor = {
  name: string;
  website: string;
  email: string;
}

export type OasLicense = {
  name: string;
  website: string;
}

export type OasContact = {
  author: OasAuthor;
}

export type OasConfigSlice = {
  path: string;
  tag: string;
  title: string;
  description: string;
  version: string;
  contact: OasContact;
  license: OasLicense
}

export const OAS_CONFIG = 'OAS_CONFIG';

export const OasConfig = registerAs<OasConfigSlice>(OAS_CONFIG, (): any => ({
  path: cast(process.env.OAS_PATH, 'String'),
  tag: cast(process.env.OAS_TAG, 'String'),
  title: cast(process.env.OAS_TITLE, 'String'),
  description: cast(process.env.OAS_DESCRIPTION, 'String'),
  version: cast(process.env.OAS_VERSION, 'String'),
  contact: {
    author: {
      name: cast(process.env.OAS_CONTACT_AUTHOR_NAME, 'String'),
      website: cast(process.env.OAS_CONTACT_AUTHOR_WEBSITE, 'String'),
      email: cast(process.env.OAS_CONTACT_AUTHOR_EMAIL, 'String')
    }
  },
  license: {
    name: cast(process.env.OAS_LICENSE_NAME, 'String'),
    website: cast(process.env.OAS_LICENSE_WEBSITE, 'String')
  }
}));

export type OasConfigType = ConfigType<typeof OasConfig>;

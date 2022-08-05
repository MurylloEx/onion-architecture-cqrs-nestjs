import * as Joi from 'joi';

export const OasSchema = Joi.object({
  OAS_PATH: Joi.string().allow('').default('docs'),
  OAS_TAG: Joi.string().default('docs'),
  OAS_TITLE: Joi.string().default('Swagger Documentation'),
  OAS_DESCRIPTION: Joi.string().default('No description provided'),
  OAS_VERSION: Joi.string().default('0.1'),
  OAS_CONTACT_AUTHOR_NAME: Joi.string().default('No author name provided'),
  OAS_CONTACT_AUTHOR_WEBSITE: Joi.string().uri().default('https://example.com/'),
  OAS_CONTACT_AUTHOR_EMAIL: Joi.string().email().default('noreply@example.com'),
  OAS_LICENSE_NAME: Joi.string().default('MIT'),
  OAS_LICENSE_WEBSITE: Joi.string().uri().default('https://opensource.org/licenses/MIT'),
});

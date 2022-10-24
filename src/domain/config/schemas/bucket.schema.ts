import * as Joi from 'joi';
 
export const BucketSchema = Joi.object({
  BUCKET_IMGUR_ID: Joi.string().required(),
  BUCKET_IMGUR_SECRET: Joi.string().required()
});

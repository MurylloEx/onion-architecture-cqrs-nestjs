import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type BucketImgur = {
  id: string;
  secret: string;
}

export type BucketConfigSlice = {
  imgur: BucketImgur;
}

export const BUCKET_CONFIG = 'BUCKET_CONFIG';

export const BucketConfig = registerAs<BucketConfigSlice>(BUCKET_CONFIG, () => ({
  imgur: {
    id: cast(process.env.BUCKET_IMGUR_ID, 'String'),
    secret: cast(process.env.BUCKET_IMGUR_SECRET, 'String')
  }
}));

export type BucketConfigType = ConfigType<typeof BucketConfig>;

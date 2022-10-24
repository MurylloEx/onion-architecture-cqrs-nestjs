import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type CompressionConfigSlice = {
  level: number;
  memoryLevel: number;
}

export const COMPRESSION_CONFIG = 'COMPRESSION_CONFIG';

export const CompressionConfig = registerAs<CompressionConfigSlice>(COMPRESSION_CONFIG, (): any => ({
  level: cast(process.env.COMPRESSION_LEVEL, 'Number'),
  memoryLevel: cast(process.env.COMPRESSION_MEMORY_LEVEL, 'Number')
}));

export type CompressionConfigType = ConfigType<typeof CompressionConfig>;

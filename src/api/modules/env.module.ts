import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from 'src/common/config/schemas';
import { RootConfig, ServerConfig } from 'src/common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ConfigSchema,
      load: [RootConfig, ServerConfig]
    })
  ]
})
export class EnvModule {}

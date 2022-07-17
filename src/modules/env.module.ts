import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from 'src/config/schemas';
import { RootConfig, ServerConfig } from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ConfigSchema,
      load: [RootConfig, ServerConfig]
    })
  ]
})
export class EnvModule {}

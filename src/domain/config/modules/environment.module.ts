import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from 'src/domain/config/schemas';
import { RootConfig, ServerConfig } from 'src/domain/config/slices';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ConfigSchema,
      load: [RootConfig, ServerConfig]
    })
  ]
})
export class EnvironmentModule {}

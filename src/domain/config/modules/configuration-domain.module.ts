import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigSlices } from 'src/domain/config/slices';
import { ConfigSchema } from 'src/domain/config/schemas';

const ConfigDynamicModule = ConfigModule.forRoot({
  load: ConfigSlices,
  validationSchema: ConfigSchema
});

@Module({
  imports: [ConfigDynamicModule],
  exports: [ConfigDynamicModule]
})
export class ConfigurationDomainModule { }

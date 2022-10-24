import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigSlices } from 'src/domain/config/slices';
import { ConfigSchema } from 'src/domain/config/schemas';
import { ConfigurationDomainService } from 'src/domain/config/services';

const ConfigDynamicModule = ConfigModule.forRoot({
  load: ConfigSlices,
  validationSchema: ConfigSchema
});

@Module({
  imports: [ConfigDynamicModule],
  exports: [ConfigDynamicModule, ConfigurationDomainService],
  providers: [ConfigurationDomainService]
})
export class ConfigurationDomainModule { }

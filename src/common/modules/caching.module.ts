import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module, Provider } from '@nestjs/common';
import { ConfigurationService } from 'src/common/services';

import { ConfigurationModule } from './configuration.module';

const CacheProvider: Provider = { 
  provide: APP_INTERCEPTOR, 
  useClass: CacheInterceptor 
};

const CacheModuleAsync = CacheModule.registerAsync({
  imports: [ConfigurationModule],
  useFactory: (configService: ConfigurationService) => configService.configureCache(),
  inject: [ConfigurationService]
});

@Module({
  imports: [CacheModuleAsync],
  providers: [CacheProvider],
  exports: [CacheModuleAsync]
})
export class CachingModule {}

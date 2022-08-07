import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module, Provider } from '@nestjs/common';
import { ConfigurationService } from 'src/common/services';

import { ConfigurationModule } from './configuration.module';

const CacheProvider: Provider = { 
  provide: APP_INTERCEPTOR, 
  useClass: CacheInterceptor 
};

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => configService.configureCache(),
      inject: [ConfigurationService]
    })
  ],
  providers: [CacheProvider]
})
export class CachingModule {}

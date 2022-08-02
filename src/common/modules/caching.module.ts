import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60, 
      max: 1024
    })
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }
  ]
})
export class CachingModule {}

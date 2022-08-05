import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationService } from 'src/common/services';
import { JwtAuthorizeProvider, JwtStrategy } from 'src/common/security';

import { ConfigurationModule } from './configuration.module';

const ThrottlerProvider = { provide: APP_GUARD, useClass: ThrottlerGuard };

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => configService.configureThrottler(),
      inject: [ConfigurationService]
    }),
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => configService.configureJwt(),
      inject: [ConfigurationService]
    })
  ],
  providers: [
    JwtStrategy,
    ThrottlerProvider,
    JwtAuthorizeProvider
  ]
})
export class SecurityModule { }

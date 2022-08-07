import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationService } from 'src/common/services';
import { JwtAuthorizeProvider, JwtStrategy, ThrottlerProvider } from 'src/common/security';

import { ConfigurationModule } from './configuration.module';

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

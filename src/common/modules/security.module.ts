import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationService } from 'src/common/services';
import {
  HttpJwtStrategy,
  WsJwtStrategy,
  ThrottlerProvider
} from 'src/common/security';

import { ConfigurationModule } from './configuration.module';

const ThrottlerModuleAsync = ThrottlerModule.forRootAsync({
  imports: [ConfigurationModule],
  useFactory: (configService: ConfigurationService) => configService.configureThrottler(),
  inject: [ConfigurationService]
});

const JwtModuleAsync = JwtModule.registerAsync({
  imports: [ConfigurationModule],
  useFactory: (configService: ConfigurationService) => configService.configureJwt(),
  inject: [ConfigurationService]
});

@Module({
  imports: [
    JwtModuleAsync,
    ThrottlerModuleAsync,
    ConfigurationModule
  ],
  exports: [
    JwtModuleAsync,
    ThrottlerModuleAsync,
  ],
  providers: [
    HttpJwtStrategy,
    WsJwtStrategy,
    ThrottlerProvider
  ]
})
export class SecurityModule { }

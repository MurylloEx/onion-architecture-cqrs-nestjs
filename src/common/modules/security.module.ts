import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { JwtAuthorizeProvider, JwtStrategy } from 'src/common/security';

const ThrottlerProvider = { provide: APP_GUARD, useClass: ThrottlerGuard };

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 16,
      limit: 64
    }),
    JwtModule.register({
      secret: 'secret'
    })
  ],
  providers: [
    JwtStrategy,
    ThrottlerProvider,
    JwtAuthorizeProvider
  ]
})
export class SecurityModule { }

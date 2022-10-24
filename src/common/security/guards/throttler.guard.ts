import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

export const ThrottlerProvider: Provider = { 
  provide: APP_GUARD, 
  useClass: ThrottlerGuard 
};

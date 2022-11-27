import { applyDecorators, UseGuards } from '@nestjs/common';
import { 
  AuthorizationGuard, 
  WsJwtAuthorizationGuard 
} from 'src/common/security/guards';

export const WsSecurity = (): ClassDecorator & MethodDecorator => applyDecorators(
  UseGuards(
    AuthorizationGuard, 
    WsJwtAuthorizationGuard
  )
);

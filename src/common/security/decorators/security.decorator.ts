import { applyDecorators, UseGuards } from '@nestjs/common';
import { 
  AuthorizationGuard, 
  HttpJwtAuthorizationGuard
} from 'src/common/security/guards';

export const Security = (): ClassDecorator & MethodDecorator => applyDecorators(
  UseGuards(
    AuthorizationGuard, 
    HttpJwtAuthorizationGuard
  )
);

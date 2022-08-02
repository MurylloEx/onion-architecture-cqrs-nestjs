import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AppVersion = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.get('x-app-version') || '0.0.0';
});
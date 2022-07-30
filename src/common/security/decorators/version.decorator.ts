import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Version = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.get('x-app-version') || '0.0.0';
});
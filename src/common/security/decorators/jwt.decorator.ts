import { WebSocket } from 'ws';
import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Jwt = createParamDecorator((_, ctx: ExecutionContext) => {
  if (ctx.getType() === 'http') {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request['user'];
  }
  if (ctx.getType() === 'ws') {
    const client = ctx.switchToWs().getClient<WebSocket>();
    return client['user'];
  }
});

import { WebSocket } from 'ws';
import { decode } from 'querystring';
import { IncomingMessage } from 'http';
import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { Requestor } from 'src/common/types';

const BEARER_PATTERN = new RegExp(/^(?:B|b)earer\s/);
const URL_SLASH_PATTERN = new RegExp(/^(?:\/\w+\/*|\/+)\??/ig)

function fromWebsocketQueryStringAsBearerToken(requestor: IncomingMessage | Requestor<WebSocket>): string | null {
  if (!(requestor instanceof WebSocket)) {
    return null;
  }

  const sanitizedUrl = requestor.request.url.replace(URL_SLASH_PATTERN, '');
  const query = decode(sanitizedUrl);
  const jwtField = query.Jwt ?? query.jwt;
  const authorizationField = query.Authorization ?? query.authorization;
  
  if (!jwtField && !authorizationField) 
    return null;

  const fields = jwtField ?? authorizationField ?? '';
  const authorization = Array.isArray(fields) 
    ? fields.splice(-1).pop() 
    : fields;

  return authorization.replace(BEARER_PATTERN, '');
}

function fromWebsocketHeaderAsBearerToken(requestor: IncomingMessage | Requestor<WebSocket>): string | null {
  if (!(requestor instanceof WebSocket)) {
    return null;
  }

  const authorization = requestor.request.headers?.authorization ?? '';

  if (!authorization) 
    return null;

  return authorization.replace(BEARER_PATTERN, '');
}

export function fromWebsocketConnection(): JwtFromRequestFunction {
  return ExtractJwt.fromExtractors([
    fromWebsocketHeaderAsBearerToken,
    fromWebsocketQueryStringAsBearerToken
  ]);
}

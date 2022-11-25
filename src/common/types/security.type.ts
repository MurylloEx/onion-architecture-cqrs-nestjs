import { IncomingMessage } from 'http';
import { JwtDto } from 'src/common/dto';

export type Authenticated<T> = T & {
  user: JwtDto;
}

export type Requestor<T> = T & {
  request: IncomingMessage;
}

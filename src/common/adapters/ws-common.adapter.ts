import { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { WsAdapter } from '@nestjs/platform-ws';
import { INestApplicationContext } from '@nestjs/common';

export class WsCommonAdapter extends WsAdapter {

  private constructor(protected readonly app: INestApplicationContext) {
    super(app);
  }

  override bindClientConnect(server: WebSocketServer, callback: Function): void {
    server.on('connection', (socket: WebSocket, request: IncomingMessage) => {
      Object.defineProperty(socket, 'request', { value: request });
    });
    super.bindClientConnect(server, callback);
  }

  static fromApp(app: INestApplicationContext): WsAdapter {
    return new WsCommonAdapter(app);
  }

}

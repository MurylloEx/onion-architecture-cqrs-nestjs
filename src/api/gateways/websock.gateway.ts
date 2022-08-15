import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { MessageBody, OnGatewayInit } from '@nestjs/websockets';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Jwt, JwtDto } from 'src/common';

@WebSocketGateway()
export class WebSockGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  protected clients: WebSocket[] = [];
  protected messages: any[] = [];

  afterInit(server: WebSocket) {
    server.prependListener('connection', this.beforeConnection.bind(this));
  }

  beforeConnection(socket: WebSocket, request: IncomingMessage) {
    socket['headers'] = request.headers;
    //Do Jwt validation logic here
  }

  handleConnection(client: WebSocket) {
    this.clients.push(client);
    setTimeout(() => {
      this.messages.slice(-50).forEach(m => client.send(JSON.stringify(m.data)));
    }, 5000);
  }
  
  handleDisconnect(client: WebSocket) {
    let k = this.clients.indexOf(client);
    this.clients.splice(k, 1);
  }

  @SubscribeMessage('broadcast')
  onBroadcast(@MessageBody() data: any, @Jwt() jwt: JwtDto) {
    this.messages.push({ timestamp: +new Date, data });
    this.messages.sort((a, b) => a.timestamp - b.timestamp);
    this.clients.forEach(s => s.send(JSON.stringify(data)));
  }

}

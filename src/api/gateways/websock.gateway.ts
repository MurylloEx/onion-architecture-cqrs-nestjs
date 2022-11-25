import { WebSocket } from 'ws';
import { MessageBody } from '@nestjs/websockets';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Access, Jwt, JwtDto, Permissions, Security } from 'src/common';

@Security()
@WebSocketGateway()
export class WebSockGateway implements OnGatewayConnection, OnGatewayDisconnect {

  protected clients: WebSocket[] = [];

  handleConnection(client: WebSocket) {
    this.clients.push(client);
  }

  handleDisconnect(client: WebSocket) {
    let k = this.clients.indexOf(client);
    this.clients.splice(k, 1);
  }

  @Permissions(Access.CREATE_MESSAGE)
  @SubscribeMessage('broadcast')
  onBroadcast(@MessageBody() data: any, @Jwt() jwt: JwtDto) {
    console.log('Message received: ', data, jwt);
  }

}

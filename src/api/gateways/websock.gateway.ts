import { WebSocket } from 'ws';
import { MessageBody } from '@nestjs/websockets';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { AuthorizeGuard, Jwt, JwtDto } from 'src/common';
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthorizeGuard)
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

  @SubscribeMessage('broadcast')
  onBroadcast(@MessageBody() data: any, @Jwt() jwt: JwtDto) {
    console.log('Message received: ', data);
  }

}

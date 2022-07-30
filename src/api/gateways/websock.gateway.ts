import { WebSocket } from 'ws';
import { MessageBody } from '@nestjs/websockets';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class WebSockGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  protected clients: WebSocket[] = [];
  protected messages: any[] = [];
  
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
  onBroadcast(@MessageBody() data: any) {
    this.messages.push({ timestamp: +new Date, data });
    this.messages.sort((a, b) => a.timestamp - b.timestamp);
    this.clients.forEach(s => s.send(JSON.stringify(data)));
  }

}

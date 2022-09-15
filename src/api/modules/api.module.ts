import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common';
import { WebSockGateway } from 'src/api/gateways';
import {
  AuthenticationController,
  MessageController,
  PetController,
  UserController
} from 'src/api/controllers';

@Module({
  imports: [CommonModule],
  controllers: [
    AuthenticationController,
    MessageController,
    PetController,
    UserController
  ],
  providers: [WebSockGateway]
})
export class ApiModule { }

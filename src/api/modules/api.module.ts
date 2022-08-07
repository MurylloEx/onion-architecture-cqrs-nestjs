import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common';
import { WebSockGateway } from 'src/api';
import { MessageController } from 'src/api/controllers';

@Module({
  imports: [CommonModule],
  controllers: [MessageController],
  providers: [WebSockGateway]
})
export class ApiModule {}

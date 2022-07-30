import { Body, Controller, Get, Post } from '@nestjs/common';
import { Message, MessageService } from 'src/domain';

@Controller()
export class MessageController {

  constructor(private messageService: MessageService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/messages')
  getMessages(): Promise<Message[]> {
    return this.messageService.fetchAll();
  }

  @Post('/message')
  createMessage(@Body() message: Message) {
    this.messageService.create(message.title, message.description);
  }

}

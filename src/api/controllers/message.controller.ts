import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessageService, MessageDto, Access, Permissions, AuthorizeGuard } from 'src/common';

@UseGuards(AuthorizeGuard)
@Controller('message')
export class MessageController {

  constructor(private readonly messageService: MessageService) {}

  @Post()
  @Permissions(Access.CREATE_MESSAGE)
  create(@Body() message: MessageDto) {
    return this.messageService.create(message.title, message.description);
  }

  @Get('all')
  @Permissions(Access.READ_MESSAGE)
  fetch(): Promise<MessageDto[]> {
    return this.messageService.fetch();
  }

  @Get(':id')
  @Permissions(Access.READ_MESSAGE)
  fetchOne(@Param('id') id: string): Promise<MessageDto> {
    return this.messageService.fetchOne(id);
  }

  @Put(':id')
  @Permissions(
    Access.UPDATE_MESSAGE, 
    Access.READ_MESSAGE
  )
  update(@Param('id') id: string, @Body() message: MessageDto): Promise<MessageDto> {
    return this.messageService.update(id, message);
  }

  @Delete(':id')
  @Permissions(
    Access.DELETE_MESSAGE,
    Access.READ_MESSAGE
  )
  delete(@Param('id') id: string) {
    return this.messageService.delete(id);
  }

}

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessageDomainService, MessageDto, Access, Permissions, AuthorizeGuard } from 'src/common';

@UseGuards(AuthorizeGuard)
@Controller('message')
export class MessageController {

  constructor(private messageDomainService: MessageDomainService) {}

  @Post()
  @Permissions(Access.CREATE_MESSAGE)
  create(@Body() message: MessageDto) {
    return this.messageDomainService.create(message.title, message.description);
  }

  @Get('all')
  @Permissions(Access.READ_MESSAGE)
  fetch(): Promise<MessageDto[]> {
    return this.messageDomainService.fetch();
  }

  @Get(':id')
  @Permissions(Access.READ_MESSAGE)
  fetchOne(@Param('id') id: string): Promise<MessageDto> {
    return this.messageDomainService.fetchOne(id);
  }

  @Put(':id')
  @Permissions(
    Access.UPDATE_MESSAGE, 
    Access.READ_MESSAGE
  )
  update(@Param('id') id: string, @Body() message: MessageDto): Promise<MessageDto> {
    return this.messageDomainService.update(id, message);
  }

  @Delete(':id')
  @Permissions(
    Access.DELETE_MESSAGE,
    Access.READ_MESSAGE
  )
  delete(@Param('id') id: string) {
    return this.messageDomainService.delete(id);
  }

}

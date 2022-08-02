import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common';
import { MessageService } from 'src/domain';

@Injectable()
export class MessageDomainService {

  constructor(private messageService: MessageService) {}

  create(title: string, description: string): Promise<MessageDto> {
    return this.messageService.create(title, description);
  }

  fetch(): Promise<MessageDto[]> {
    return this.messageService.fetch();
  }

  fetchOne(id: string): Promise<MessageDto> {
    return this.messageService.fetchById(id);
  }

  update(id: string, message: MessageDto): Promise<MessageDto> {
    return this.messageService.updateById(id, message);
  }

  delete(id: string): Promise<MessageDto> {
    return this.messageService.deleteById(id);
  }

}

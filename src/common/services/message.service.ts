import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common';
import { MessageDomainService } from 'src/domain';

@Injectable()
export class MessageService {

  constructor(private readonly messageService: MessageDomainService) {}

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

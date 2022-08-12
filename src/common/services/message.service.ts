import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common/dto';
import { MessageDomainService } from 'src/domain';

@Injectable()
export class MessageService {

  constructor(private readonly messageDomainService: MessageDomainService) {}

  create(title: string, description: string): Promise<MessageDto> {
    return this.messageDomainService.create(title, description);
  }

  fetch(): Promise<MessageDto[]> {
    return this.messageDomainService.fetch();
  }

  fetchOne(id: string): Promise<MessageDto> {
    return this.messageDomainService.fetchById(id);
  }

  update(id: string, message: MessageDto): Promise<MessageDto> {
    return this.messageDomainService.updateById(id, message);
  }

  delete(id: string): Promise<MessageDto> {
    return this.messageDomainService.deleteById(id);
  }

}

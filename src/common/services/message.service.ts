import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common/dto';
import { MessageDomainService } from 'src/domain';

@Injectable()
export class MessageService {

  constructor(private readonly messageDomainService: MessageDomainService) {}

  async create(title: string, description: string): Promise<MessageDto> {
    const entity = await this.messageDomainService.create(title, description);
    return entity.toDto(MessageDto);
  }

  async fetch(): Promise<MessageDto[]> {
    const entities = await this.messageDomainService.fetch();
    return entities.map(entity => entity.toDto(MessageDto));
  }

  async fetchOne(id: string): Promise<MessageDto> {
    const entity = await this.messageDomainService.fetchById(id);
    return entity.toDto(MessageDto);
  }

  async update(id: string, message: MessageDto): Promise<MessageDto> {
    const entity = await this.messageDomainService.updateById(id, message);
    return entity.toDto(MessageDto);
  }

  async delete(id: string): Promise<MessageDto> {
    const entity = await this.messageDomainService.deleteById(id);
    return entity.toDto(MessageDto);
  }

}

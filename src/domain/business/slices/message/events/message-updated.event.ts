import { IEvent } from '@nestjs/cqrs';
import { Message } from 'src/domain/business/slices/message/models';

export class MessageUpdatedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly message: Message
  ) {}
}

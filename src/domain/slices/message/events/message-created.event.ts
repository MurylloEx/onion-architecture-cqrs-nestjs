import { IEvent } from '@nestjs/cqrs';

export class MessageCreatedEvent implements IEvent {
  constructor(
    public readonly title: string,
    public readonly description: string
  ) {}
}

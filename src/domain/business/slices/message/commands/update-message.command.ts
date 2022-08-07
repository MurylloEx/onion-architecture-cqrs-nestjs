import { ICommand } from '@nestjs/cqrs';
import { Message } from 'src/domain/business/slices/message/models';

export class UpdateMessageCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly message: Partial<Message>
  ) {}
}

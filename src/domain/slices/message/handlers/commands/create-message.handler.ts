import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMessageCommand } from 'src/domain/slices/message/commands';
import { MessageRepository } from 'src/domain/slices/message/repositories';

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler implements ICommandHandler<CreateMessageCommand> {

  constructor(private repository: MessageRepository) {}

  async execute(command: CreateMessageCommand) {
    console.log('Command called:', command);
    this.repository.create(command.title, command.description);
  }

}

import { ICommand } from '@nestjs/cqrs';

export class CreateMessageCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
  ) {}
}

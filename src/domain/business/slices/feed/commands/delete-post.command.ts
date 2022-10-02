import { ICommand } from '@nestjs/cqrs';

export class DeletePostCommand implements ICommand {
  constructor(
    public readonly id: string
  ) {}
}

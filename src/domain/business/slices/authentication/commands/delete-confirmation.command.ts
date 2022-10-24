import { ICommand } from '@nestjs/cqrs';

export class DeleteConfirmationCommand implements ICommand {
  constructor(
    public readonly id: string
  ) {}
}
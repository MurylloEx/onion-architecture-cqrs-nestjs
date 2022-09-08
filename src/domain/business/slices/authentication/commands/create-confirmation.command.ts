import { ICommand } from '@nestjs/cqrs';

export class CreateConfirmationCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly code: string
  ) {}
}

import { ICommand } from '@nestjs/cqrs';

export class ConfirmAccountCommand implements ICommand {
  constructor(
    public readonly code: string
  ) {}
}

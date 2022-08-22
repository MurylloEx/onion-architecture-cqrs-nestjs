import { ICommand } from '@nestjs/cqrs';

export class CreateRecoveryCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly code: string
  ) { }
}

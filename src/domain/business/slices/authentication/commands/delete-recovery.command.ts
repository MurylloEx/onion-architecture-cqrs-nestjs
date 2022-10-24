import { ICommand } from '@nestjs/cqrs';

export class DeleteRecoveryCommand implements ICommand {
  constructor(
    public readonly id: string
  ) {}
}

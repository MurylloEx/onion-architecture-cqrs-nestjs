import { ICommand } from '@nestjs/cqrs';

export class RequestRecoveryCodeCommand implements ICommand {
  constructor(
    public readonly userEmail: string
  ) {}
}

import { ICommand } from '@nestjs/cqrs';

export class DeleteAuthenticationCommand implements ICommand {
  constructor(
    public readonly id: string
  ) {}
}

import { ICommand } from '@nestjs/cqrs';

export class UpdatePasswordCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly code: string,
    public readonly password: string
  ) {}
}

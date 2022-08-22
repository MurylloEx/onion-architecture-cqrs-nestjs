import { ICommand } from '@nestjs/cqrs';

export class CreateAuthenticationCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly ipAddress: string,
    public readonly jwt: string
  ) {}
}

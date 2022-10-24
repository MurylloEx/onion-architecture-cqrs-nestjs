import { ICommand } from '@nestjs/cqrs';

export class ChangePasswordCommand implements ICommand {
  constructor(
    public readonly recoveryCode: string,
    public readonly newPassword: string
  ) {}
}

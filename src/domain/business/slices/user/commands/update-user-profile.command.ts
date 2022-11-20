import { ICommand } from '@nestjs/cqrs';

export class UpdateUserProfileCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly fullName?: string,
    public readonly nickName?: string,
    public readonly phone?: string,
    public readonly email?: string
  ) {}
}

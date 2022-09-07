import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly fullName: string,
    public readonly nickName: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly password: string,
    public readonly descriptor: number,
    public readonly pushToken: string,
    public readonly pictureId: string
  ) {}
}

import { ICommand } from '@nestjs/cqrs';
import { User } from 'src/domain/business/slices/user/models';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly user: Partial<User>
  ) {}
}

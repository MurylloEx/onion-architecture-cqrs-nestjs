import { IEvent } from '@nestjs/cqrs';
import { User } from 'src/domain/business/slices/user/models';

export class UserDeletedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly user: User
  ) {}
}

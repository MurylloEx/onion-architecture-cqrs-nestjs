import { IEvent } from '@nestjs/cqrs';
import { User } from 'src/domain/business/slices/user/models';
import { Confirmation } from 'src/domain/business/slices/authentication/models';

export class UserRegisteredEvent implements IEvent {
  constructor(
    public readonly user: User,
    public readonly confirmation: Confirmation
  ) {}
}

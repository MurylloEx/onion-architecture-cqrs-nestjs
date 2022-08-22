import { IEvent } from '@nestjs/cqrs';
import { User } from 'src/domain/business/slices/user/models';
import { Recovery } from 'src/domain/business/slices/authentication/models';

export class RecoveryRequestedCodeEvent implements IEvent {
  constructor(
    public readonly user: User,
    public readonly recovery: Recovery
  ) {}
}

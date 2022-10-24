import { ICommand } from '@nestjs/cqrs';
import { Recovery } from 'src/domain/business/slices/authentication/models';

export class UpdateRecoveryCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly recovery: Partial<Recovery>
  ) {}
}

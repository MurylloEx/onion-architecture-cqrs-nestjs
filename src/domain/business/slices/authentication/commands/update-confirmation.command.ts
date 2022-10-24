import { ICommand } from '@nestjs/cqrs';
import { Confirmation } from 'src/domain/business/slices/authentication/models';

export class UpdateConfirmationCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly confirmation: Partial<Confirmation>
  ) {}
}

import { ICommand } from '@nestjs/cqrs';
import { Authentication } from 'src/domain/business/slices/authentication/models';

export class UpdateAuthenticationCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly authentication: Partial<Authentication>
  ) {}
}

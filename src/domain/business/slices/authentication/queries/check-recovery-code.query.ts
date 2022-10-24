import { IQuery } from '@nestjs/cqrs';

export class CheckRecoveryCodeQuery implements IQuery {
  constructor(
    public readonly code: string
  ) {}
}

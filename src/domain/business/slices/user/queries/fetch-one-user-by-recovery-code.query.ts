import { IQuery } from '@nestjs/cqrs';

export class FetchOneUserByRecoveryCodeQuery implements IQuery {
  constructor(
    public readonly code: string
  ) { }
}

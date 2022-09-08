import { IQuery } from '@nestjs/cqrs';

export class FetchOneRecoveryQuery implements IQuery {
  constructor(
    public readonly id: string
  ) {}
}

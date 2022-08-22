import { IQuery } from '@nestjs/cqrs';

export class FetchOneConfirmationQuery implements IQuery {
  constructor(
    public readonly id: string
  ) {}
}

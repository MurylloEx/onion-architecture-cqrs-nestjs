import { IQuery } from '@nestjs/cqrs';

export class FetchOneAuthenticationQuery implements IQuery {
  constructor(
    public readonly id: string
  ) {}
}

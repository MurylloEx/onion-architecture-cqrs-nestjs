import { IQuery } from '@nestjs/cqrs';

export class FetchOneUserByEmailQuery implements IQuery {
  constructor(
    public readonly email: string
  ) { }
}

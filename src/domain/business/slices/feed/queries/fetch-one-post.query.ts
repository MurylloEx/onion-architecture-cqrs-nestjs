import { IQuery } from '@nestjs/cqrs';

export class FetchOnePostQuery implements IQuery {
  constructor(
    public readonly id: string
  ) {}
}

import { IQuery } from '@nestjs/cqrs';

export class FetchOneMessageQuery implements IQuery {
  constructor(
    public readonly id: string
  ) {}
}

import { IQuery } from '@nestjs/cqrs';

export class FetchOnePetQuery implements IQuery {
  constructor(
    public readonly id: string
  ) {}
}

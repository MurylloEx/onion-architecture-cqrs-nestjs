import { IQuery } from '@nestjs/cqrs';

export class FetchOwnPetsQuery implements IQuery {
  constructor(
    public readonly userId: string
  ) {}
}

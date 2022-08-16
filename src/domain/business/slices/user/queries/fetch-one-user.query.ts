import { IQuery } from '@nestjs/cqrs';

export class FetchOneUserQuery implements IQuery {
  constructor(public readonly id: string) {}
}

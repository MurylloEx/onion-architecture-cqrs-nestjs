import { IQuery } from '@nestjs/cqrs';

export class FetchOneUserByNickNameQuery implements IQuery {
  constructor(
    public readonly nickName: string
  ) { }
}

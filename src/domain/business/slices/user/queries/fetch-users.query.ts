import { IQuery } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { User } from 'src/domain/business/slices/user/models';

export class FetchUsersQuery implements IQuery {
  constructor(
    public readonly options?: FindManyOptions<User>
  ) {}
}

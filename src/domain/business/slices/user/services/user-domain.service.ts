import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

import {
  FetchUsersQuery,
  FetchOneUserQuery
} from 'src/domain/business/slices/user/queries';

import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from 'src/domain/business/slices/user/commands';

import { User } from 'src/domain/business/slices/user/models';

@Injectable()
export class UserDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  fetch(options?: FindManyOptions<User>) {
    const query = new FetchUsersQuery(options);
    return this.queryBus.execute<IQuery, User[]>(query);
  }

  fetchById(id: string) {
    const query = new FetchOneUserQuery(id);
    return this.queryBus.execute<IQuery, User>(query);
  }

  create(
    userName: string,
    nickName: string,
    phone: string,
    email: string,
    password: string,
    pushToken: string,
    pictureId: string
  ) {
    const command = new CreateUserCommand(
      userName,
      nickName,
      phone,
      email,
      password,
      pushToken,
      pictureId
    );
    return this.commandBus.execute<ICommand, User>(command);
  }

  updateById(id: string, user: Partial<User>) {
    const command = new UpdateUserCommand(id, user);
    return this.commandBus.execute<ICommand, User>(command);
  }

  deleteById(id: string) {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute<ICommand, User>(command);
  }

}

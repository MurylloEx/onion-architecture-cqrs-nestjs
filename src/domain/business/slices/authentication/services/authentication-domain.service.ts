import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user';
import { Authentication } from 'src/domain/business/slices/authentication/models';

import { 
  CreateAuthenticationCommand, 
  UpdateAuthenticationCommand, 
  DeleteAuthenticationCommand, 
  RegisterUserCommandBuilder,
  AuthenticateUserCommand,
} from 'src/domain/business/slices/authentication/commands';

import { 
  FetchAuthenticationsQuery, 
  FetchOneAuthenticationQuery 
} from 'src/domain/business/slices/authentication/queries';

@Injectable()
export class AuthenticationDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  fetch(options?: FindManyOptions<Authentication>): Promise<Authentication[]> {
    const query = new FetchAuthenticationsQuery(options);
    return this.queryBus.execute<IQuery, Authentication[]>(query);
  }

  fetchById(id: string): Promise<Authentication> {
    const query = new FetchOneAuthenticationQuery(id);
    return this.queryBus.execute<IQuery, Authentication>(query);
  }

  create(
    userId: string,
    ipAddress: string,
    jwt: string
  ): Promise<Authentication>
  {
    const command = new CreateAuthenticationCommand(userId, ipAddress, jwt);
    return this.commandBus.execute<ICommand, Authentication>(command);
  }

  updateById(
    id: string, 
    authentication: Partial<Authentication>
  ): Promise<Authentication>
  {
    const command = new UpdateAuthenticationCommand(id, authentication);
    return this.commandBus.execute<ICommand, Authentication>(command);
  }

  deleteById(id: string): Promise<Authentication> {
    const command = new DeleteAuthenticationCommand(id);
    return this.commandBus.execute<ICommand, Authentication>(command);
  }

  registerUser(
    fullName: string,
    nickName: string,
    phone: string,
    email: string,
    password: string,
    permissions: string,
    pushToken: string
  ): Promise<User>
  {
    const command = new RegisterUserCommandBuilder()
      .withFullName(fullName)
      .withNickName(nickName)
      .withPhone(phone)
      .withEmail(email)
      .withPassword(password)
      .withPushToken(pushToken)
      .withPermissions(permissions)
      .build();

    return this.commandBus.execute<ICommand, User>(command);
  }

  authenticateUser(
    userEmail: string, 
    password: string, 
    pushToken: string,
    ipAddress: string
  )
  {
    const command = new AuthenticateUserCommand(
      userEmail, 
      password, 
      pushToken, 
      ipAddress
    );
    return this.commandBus.execute<ICommand, Authentication>(command);
  }

}

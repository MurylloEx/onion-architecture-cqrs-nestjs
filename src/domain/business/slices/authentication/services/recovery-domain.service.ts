import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user';
import { Recovery } from 'src/domain/business/slices/authentication/models';

import { 
  CheckRecoveryCodeQuery,
  FetchOneRecoveryQuery, 
  FetchRecoveriesQuery 
} from 'src/domain/business/slices/authentication/queries';

import { 
  ChangePasswordCommand, 
  CreateRecoveryCommand, 
  DeleteRecoveryCommand, 
  RequestRecoveryCodeCommand, 
  UpdateRecoveryCommand
} from 'src/domain/business/slices/authentication/commands';

@Injectable()
export class RecoveryDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  fetch(options?: FindManyOptions<Recovery>): Promise<Recovery[]> {
    const query = new FetchRecoveriesQuery(options);
    return this.queryBus.execute<IQuery, Recovery[]>(query);
  }

  fetchById(id: string): Promise<Recovery> {
    const query = new FetchOneRecoveryQuery(id);
    return this.queryBus.execute<IQuery, Recovery>(query);
  }

  create(userId: string, code: string): Promise<Recovery> {
    const command = new CreateRecoveryCommand(userId, code);
    return this.commandBus.execute<ICommand, Recovery>(command);
  }

  updateById(id: string, recovery: Partial<Recovery>) {
    const command = new UpdateRecoveryCommand(id, recovery);
    return this.commandBus.execute<ICommand, Recovery>(command);
  }

  deleteById(id: string) {
    const command = new DeleteRecoveryCommand(id);
    return this.commandBus.execute<ICommand, Recovery>(command);
  }

  requestRecoveryCode(userEmail: string): Promise<Recovery> {
    const command = new RequestRecoveryCodeCommand(userEmail);
    return this.commandBus.execute<ICommand, Recovery>(command);
  }

  checkRecoveryCode(recoveryCode: string): Promise<boolean> {
    const query = new CheckRecoveryCodeQuery(recoveryCode);
    return this.queryBus.execute<IQuery, boolean>(query);
  }

  changePassword(recoveryCode: string, newPassword: string): Promise<User> {
    const command = new ChangePasswordCommand(recoveryCode, newPassword);
    return this.commandBus.execute<ICommand, User>(command);
  }

}

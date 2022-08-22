import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

import { Confirmation } from 'src/domain/business/slices/authentication/models';
import { FetchConfirmationsQuery, FetchOneConfirmationQuery } from 'src/domain/business/slices/authentication/queries';

import { 
  ConfirmAccountCommand, 
  CreateConfirmationCommand, 
  DeleteConfirmationCommand, 
  UpdateConfirmationCommand
} from 'src/domain/business/slices/authentication/commands';

@Injectable()
export class ConfirmationDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  fetch(options?: FindManyOptions<Confirmation>): Promise<Confirmation[]> {
    const query = new FetchConfirmationsQuery(options);
    return this.queryBus.execute<IQuery, Confirmation[]>(query);
  }

  fetchById(id: string): Promise<Confirmation> {
    const query = new FetchOneConfirmationQuery(id);
    return this.queryBus.execute<IQuery, Confirmation>(query);
  }

  create(userId: string, code: string) {
    const command = new CreateConfirmationCommand(userId, code);
    return this.commandBus.execute<ICommand, Confirmation>(command);
  }

  updateById(id: string, confirmation: Partial<Confirmation>) {
    const command = new UpdateConfirmationCommand(id, confirmation);
    return this.commandBus.execute<ICommand, Confirmation>(command);
  }

  deleteById(id: string): Promise<Confirmation> {
    const command = new DeleteConfirmationCommand(id);
    return this.commandBus.execute<ICommand, Confirmation>(command);
  }

  confirmAccount(confirmationCode: string): Promise<Confirmation> {
    const command = new ConfirmAccountCommand(confirmationCode);
    return this.commandBus.execute<ICommand, Confirmation>(command);
  }

}

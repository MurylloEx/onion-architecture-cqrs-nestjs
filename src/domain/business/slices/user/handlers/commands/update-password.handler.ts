import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdatePasswordCommand } from 'src/domain/business/slices/user/commands';
import { UserRepository } from 'src/domain/business/slices/user/repositories';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler implements ICommandHandler<UpdatePasswordCommand> {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  async execute(command: UpdatePasswordCommand): Promise<boolean> {
    const user = await this.repository.fetchById(command.userId);
    user.password = command.password;
    await this.repository.updateById(user.id, user);
    return true;
  }

}

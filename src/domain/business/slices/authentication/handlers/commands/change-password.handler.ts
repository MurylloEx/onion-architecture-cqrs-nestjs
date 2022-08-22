import { hash } from 'bcrypt';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from 'src/domain/business/slices/user';
import { Recovery } from 'src/domain/business/slices/authentication/models';
import { ChangePasswordCommand } from 'src/domain/business/slices/authentication/commands';
import { RecoveryRepository } from 'src/domain/business/slices/authentication/repositories';
import { InvalidRecoveryCodeDomainException } from 'src/domain/business/slices/authentication/exceptions';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {

  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly repository: RecoveryRepository
  ) {}

  async execute(command: ChangePasswordCommand): Promise<Recovery> {
    const count = await this.repository.countByCode(command.recoveryCode);
    const isValidRecovery = count > 0;

    if (!isValidRecovery) {
      throw new InvalidRecoveryCodeDomainException();
    }

    const recovery = await this.repository.fetchByCode(command.recoveryCode);
    const hashedPassword = await hash(command.newPassword, 10);

    await this.userDomainService.updateById(recovery.user.id, {
      password: hashedPassword
    });

    await this.repository.deleteByUserId(recovery.user.id);

    return recovery;
  }

}

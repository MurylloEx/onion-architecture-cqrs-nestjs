import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { BucketDomainService } from 'src/domain/business/slices/bucket';
import { UserUpdatedEvent } from 'src/domain/business/slices/user/events';
import { UpdateUserProfileCommand } from 'src/domain/business/slices/user/commands';
import { UserRepository } from 'src/domain/business/slices/user/repositories';

import {
  UserEmailAlreadyExistsDomainException,
  UserNickNameAlreadyExistsDomainException
} from 'src/domain/business/slices/user/exceptions';

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler implements ICommandHandler<UpdateUserProfileCommand> {

  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus,
    private readonly bucketDomainService: BucketDomainService
  ) { }

  async execute(command: UpdateUserProfileCommand): Promise<User> {
    const availability = await this.repository.verifyUserAvailability(
      command.email ?? '',
      command.nickName ?? ''
    );

    if (!availability.emailAvailable) {
      throw new UserEmailAlreadyExistsDomainException();
    }

    if (!availability.nickNameAvailable) {
      throw new UserNickNameAlreadyExistsDomainException();
    }

    const user = await this.repository.fetchById(command.id);

    user.fullName = command.fullName ?? user.fullName;
    user.nickName = command.nickName ?? user.nickName;
    user.phone = command.phone ?? user.phone;
    user.email = command.email ?? user.email;

    if (command.pictureBuffer) {
      const picture = await this.bucketDomainService.createImage(
        command.pictureBuffer,
        user.nickName,
        user.fullName
      );

      user.pictureId = picture.id;
    }

    const updatedUser = await this.repository.updateById(command.id, user);

    if (updatedUser.affected > 0) {
      this.eventBus.publish(new UserUpdatedEvent(command.id, user));
    }

    return user;
  }

}

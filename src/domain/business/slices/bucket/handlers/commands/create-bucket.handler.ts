import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateBucketCommand } from 'src/domain/business/slices/bucket/commands';
import { BucketRepository } from 'src/domain/business/slices/bucket/repositories';

@CommandHandler(CreateBucketCommand)
export class CreateBucketHandler implements ICommandHandler<CreateBucketCommand> {

  constructor(private readonly repository: BucketRepository) {}

  async execute(command: CreateBucketCommand): Promise<void> {
    await this.repository.create(
      command.type,
      command.actionType,
      command.referenceId,
      command.extraInfo
    );
  }

}

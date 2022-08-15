import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateBucketCommand } from 'src/domain/business/slices/bucket/commands';
import { BucketRepository } from 'src/domain/business/slices/bucket/repositories';

@CommandHandler(UpdateBucketCommand)
export class UpdateBucketHandler implements ICommandHandler<UpdateBucketCommand> {

  constructor(private readonly repository: BucketRepository) {}

  async execute(command: UpdateBucketCommand): Promise<void> {
    await this.repository.updateById(command.id, command.bucket);
  }

}

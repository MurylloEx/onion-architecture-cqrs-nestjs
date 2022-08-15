import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteBucketCommand } from 'src/domain/business/slices/bucket/commands';
import { BucketRepository } from 'src/domain/business/slices/bucket/repositories';

@CommandHandler(DeleteBucketCommand)
export class DeleteBucketHandler implements ICommandHandler<DeleteBucketCommand> {

  constructor(private readonly repository: BucketRepository) {}

  async execute(command: DeleteBucketCommand): Promise<void> {
    await this.repository.deleteById(command.id);
  }

}

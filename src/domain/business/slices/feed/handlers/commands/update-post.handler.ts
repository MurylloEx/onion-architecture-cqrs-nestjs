import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Post } from 'src/domain/business/slices/feed/models';
import { UpdatePostCommand } from 'src/domain/business/slices/feed/commands';
import { PostRepository } from 'src/domain/business/slices/feed/repositories';
import { PostNotFoundDomainException } from 'src/domain/business/slices/feed/exceptions';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {

  constructor(private readonly repository: PostRepository) {}

  async execute(command: UpdatePostCommand): Promise<Post> {
    const updateResult = await this.repository.updateById(command.id, command.post);

    if (updateResult.affected === 0) {
      throw new PostNotFoundDomainException();
    }

    return await this.repository.fetchById(command.id);
  }

}

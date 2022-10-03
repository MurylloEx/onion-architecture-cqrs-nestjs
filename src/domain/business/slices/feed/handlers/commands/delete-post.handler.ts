import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Post } from 'src/domain/business/slices/feed/models';
import { DeletePostCommand } from 'src/domain/business/slices/feed/commands';
import { PostRepository } from 'src/domain/business/slices/feed/repositories';
import { PostNotFoundDomainException } from 'src/domain/business/slices/feed/exceptions';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {

  constructor(private readonly repository: PostRepository) {}

  async execute(command: DeletePostCommand): Promise<Post> {
    const post = await this.repository.fetchById(command.id);
    const updateResult = await this.repository.deleteById(command.id);

    if (updateResult.affected === 0) {
      throw new PostNotFoundDomainException();
    }

    return post;
  }

}

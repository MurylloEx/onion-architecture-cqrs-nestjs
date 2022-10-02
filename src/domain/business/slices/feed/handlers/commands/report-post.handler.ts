import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Post } from 'src/domain/business/slices/feed/models';
import { ReportPostCommand } from 'src/domain/business/slices/feed/commands';
import { PostRepository } from 'src/domain/business/slices/feed/repositories';
import { PostNotFoundDomainException } from 'src/domain/business/slices/feed/exceptions';

@CommandHandler(ReportPostCommand)
export class ReportPostHandler implements ICommandHandler<ReportPostCommand> {

  constructor(private readonly repository: PostRepository) { }

  async execute(command: ReportPostCommand): Promise<Post> {
    const post = await this.repository.fetchById(command.id);

    post.reports++;

    const updateResult = await this.repository.updateById(command.id, post);

    if (updateResult.affected === 0) {
      throw new PostNotFoundDomainException()
    }

    return post;
  }

}

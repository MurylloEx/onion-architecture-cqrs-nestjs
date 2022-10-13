import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Commentary } from 'src/domain/business/slices/commentary/models';
import { PostDomainService } from 'src/domain/business/slices/feed/services';
import { UserDomainService } from 'src/domain/business/slices/user/services';
import { CommentaryRepository } from 'src/domain/business/slices/commentary/repositories';
import { CreateCommentaryByPostCommand } from 'src/domain/business/slices/commentary/commands';
import { CannotCreateCommentaryDomainException } from 'src/domain/business/slices/commentary/exceptions';

@CommandHandler(CreateCommentaryByPostCommand)
export class CreateCommentaryByPostHandler implements ICommandHandler<CreateCommentaryByPostCommand> {

  constructor(
    private readonly postDomainService: PostDomainService,
    private readonly userDomainService: UserDomainService,
    private readonly commentaryRepository: CommentaryRepository,
  ) {}

  async execute(command: CreateCommentaryByPostCommand): Promise<Commentary> {
    const post = await this.postDomainService.fetchById(command.postId);
    const user = await this.userDomainService.fetchById(command.userId);

    try {
      return await this.commentaryRepository.create(user, post, command.text);
    } catch (error) {
      throw new CannotCreateCommentaryDomainException();
    }
  }

}

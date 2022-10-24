import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Commentary } from 'src/domain/business/slices/commentary/models';
import { PostDomainService } from 'src/domain/business/slices/feed/services';
import { UserDomainService } from 'src/domain/business/slices/user/services';
import { CommentaryCreatedEvent } from 'src/domain/business/slices/commentary/events';
import { CommentaryRepository } from 'src/domain/business/slices/commentary/repositories';
import { CreateCommentaryByPostCommand } from 'src/domain/business/slices/commentary/commands';
import { CannotCreateCommentaryDomainException } from 'src/domain/business/slices/commentary/exceptions';

@CommandHandler(CreateCommentaryByPostCommand)
export class CreateCommentaryByPostHandler implements ICommandHandler<CreateCommentaryByPostCommand> {

  constructor(
    private readonly eventBus: EventBus,
    private readonly postDomainService: PostDomainService,
    private readonly userDomainService: UserDomainService,
    private readonly commentaryRepository: CommentaryRepository,
  ) {}

  async execute(command: CreateCommentaryByPostCommand): Promise<Commentary> {
    try {
      const post = await this.postDomainService.fetchById(command.postId);
      const user = await this.userDomainService.fetchById(command.userId);

      const createdCommentary = await this.commentaryRepository.create(user, post, command.text);

      this.eventBus.publish(new CommentaryCreatedEvent(createdCommentary, post));

      return createdCommentary;
    } catch (error) {
      throw new CannotCreateCommentaryDomainException();
    }
  }

}

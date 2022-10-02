import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Post } from 'src/domain/business/slices/feed/models';
import { CreatePostCommand } from 'src/domain/business/slices/feed/commands';
import { PostRepository } from 'src/domain/business/slices/feed/repositories';
import { PetDomainService } from 'src/domain/business/slices/pet';
import { UserDomainService } from 'src/domain/business/slices/user';
import { BucketDomainService } from 'src/domain/business/slices/bucket';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {

  constructor(
    private readonly repository: PostRepository,
    private readonly bucketDomainService: BucketDomainService,
    private readonly petDomainService: PetDomainService,
    private readonly userDomainService: UserDomainService
  ) { }

  async execute(command: CreatePostCommand): Promise<Post> {
    const picture = await this.bucketDomainService.createImage(
      command.pictureBuffer,
      command.type,
      command.description
    );

    const pet = await this.petDomainService.fetchById(command.petId);
    const user = await this.userDomainService.fetchById(command.userId);
    const lastPost = await this.repository.fetchLast();

    const offset = lastPost ? lastPost.offset + 1 : 1;
    const reports = 0;

    const createdPost = await this.repository.create(
      pet,
      user,
      offset,
      command.type,
      reports,
      picture.id,
      command.localization,
      command.description,
      command.lostCircumstance,
      command.lostDate,
      command.lostReward
    );

    return createdPost;
  }

}

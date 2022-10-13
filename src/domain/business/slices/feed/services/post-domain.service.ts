import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

import { Post, PostFilterRule } from 'src/domain/business/slices/feed/models';
import { PostType } from 'src/domain/business/slices/feed/types';

import { 
  FetchPostFilterRulesQuery, 
  FetchOnePostQuery, 
  FetchPostsQuery,
} from 'src/domain/business/slices/feed/queries';

import { 
  DeletePostCommand,
  ReportPostCommand,
  UpdatePostCommand,
  CreatePostCommandBuilder
} from 'src/domain/business/slices/feed/commands';

@Injectable()
export class PostDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  create(
    type: PostType,
    petId: string,
    pictureBuffer: Buffer,
    localization: string,
    description: string,
    lostDate?: Date,
    lostReward?: number,
    lostCircumstance?: string
  ): Promise<Post> {
    const command = new CreatePostCommandBuilder()
      .withType(type)
      .withPetId(petId)
      .withPictureBuffer(pictureBuffer)
      .withLocalization(localization)
      .withDescription(description)
      .withLostDate(lostDate)
      .withLostReward(lostReward)
      .withLostCircumstance(lostCircumstance)
      .build();
    return this.commandBus.execute<ICommand, Post>(command);
  }

  deleteById(id: string): Promise<Post> {
    const command = new DeletePostCommand(id);
    return this.commandBus.execute<ICommand, Post>(command);
  }

  reportById(id: string): Promise<Post> {
    const command = new ReportPostCommand(id);
    return this.commandBus.execute<ICommand, Post>(command);
  }

  updateById(id: string, post: Partial<Post>): Promise<Post> {
    const command = new UpdatePostCommand(id, post);
    return this.commandBus.execute<ICommand, Post>(command);
  }

  fetchFilterRules(): Promise<PostFilterRule[]> {
    const query = new FetchPostFilterRulesQuery();
    return this.queryBus.execute<IQuery, PostFilterRule[]>(query);
  }

  fetchById(id: string): Promise<Post> {
    const query = new FetchOnePostQuery(id);
    return this.queryBus.execute<IQuery, Post>(query);
  }

  fetch(options?: FindManyOptions<Post>): Promise<Post[]> {
    const query = new FetchPostsQuery(options);
    return this.queryBus.execute<IQuery, Post[]>(query);
  }

}

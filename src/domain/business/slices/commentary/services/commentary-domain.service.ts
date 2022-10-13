import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';
import { Commentary } from 'src/domain/business/slices/commentary/models';
import { FetchCommentariesByPostQuery } from 'src/domain/business/slices/commentary/queries';
import { CreateCommentaryByPostCommand } from 'src/domain/business/slices/commentary/commands';

@Injectable()
export class CommentaryDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  create(userId: string, postId: string, text: string): Promise<Commentary> {
    const command = new CreateCommentaryByPostCommand(userId, postId, text);
    return this.commandBus.execute<ICommand, Commentary>(command);
  }

  fetchByPostId(postId: string): Promise<Commentary[]> {
    const query = new FetchCommentariesByPostQuery(postId);
    return this.queryBus.execute<IQuery, Commentary[]>(query);
  }

}

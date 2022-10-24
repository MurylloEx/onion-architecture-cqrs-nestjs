import { IQuery } from '@nestjs/cqrs';

export class FetchCommentariesByPostQuery implements IQuery {
  constructor(
    public readonly postId: string
  ) {}
}

import { IQuery } from '@nestjs/cqrs';

export class FetchCommentariesByPeriodAndPostQuery implements IQuery {
  constructor(
    public readonly postId: string,
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {}
}

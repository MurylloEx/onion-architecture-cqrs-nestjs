import { IEvent } from '@nestjs/cqrs';
import { Post } from 'src/domain/business/slices/feed/models';
import { Commentary } from 'src/domain/business/slices/commentary/models';

export class CommentaryCreatedEvent implements IEvent {
  constructor(
    public readonly commentary: Commentary,
    public readonly post: Post
  ) {}
}

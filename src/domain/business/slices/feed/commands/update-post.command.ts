import { ICommand } from '@nestjs/cqrs';
import { Post } from 'src/domain/business/slices/feed/models';

export class UpdatePostCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly post: Partial<Post>
  ) {}
}

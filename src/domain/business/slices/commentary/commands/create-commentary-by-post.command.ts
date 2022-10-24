import { ICommand } from '@nestjs/cqrs';

export class CreateCommentaryByPostCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly postId: string,
    public readonly text: string
  ) {}
}

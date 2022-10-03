import { ICommand } from '@nestjs/cqrs';
import { PostType } from 'src/domain/business/slices/feed/types';

export class CreatePostCommand implements ICommand {
  constructor(
    public readonly petId: string,
    public readonly userId: string,
    public readonly type: PostType,
    public readonly pictureBuffer: Buffer,
    public readonly localization: string,
    public readonly description: string,
    public readonly lostDate?: Date,
    public readonly lostReward?: number,
    public readonly lostCircumstance?: string
  ) {}
}

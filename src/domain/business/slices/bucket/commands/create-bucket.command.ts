import { ICommand } from '@nestjs/cqrs';
import { BucketActionType, BucketType } from 'src/domain/business/slices/bucket/types';

export class CreateBucketCommand implements ICommand {
  constructor(
    public readonly type: BucketType,
    public readonly actionType: BucketActionType,
    public readonly referenceId: string,
    public readonly extraInfo: string,
  ) {}
}

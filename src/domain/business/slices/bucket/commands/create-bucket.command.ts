import { ICommand } from '@nestjs/cqrs';

export class CreateBucketCommand implements ICommand {
  constructor(
    public readonly type: string,
    public readonly actionType: string,
    public readonly referenceId: string,
    public readonly extraInfo: string,
  ) {}
}

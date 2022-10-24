import { ICommand } from '@nestjs/cqrs';

export class DeleteBucketCommand implements ICommand {
  constructor(public readonly id: string) {}
}

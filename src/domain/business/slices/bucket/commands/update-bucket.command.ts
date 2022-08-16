import { ICommand } from '@nestjs/cqrs';
import { Bucket } from 'src/domain/business/slices/bucket/models';

export class UpdateBucketCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly bucket: Partial<Bucket>
  ) {}
}

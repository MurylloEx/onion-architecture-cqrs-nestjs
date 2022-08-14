import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { Bucket } from 'src/domain/business/slices/bucket/models';

@Injectable()
export class BucketRepository {

  constructor(
    @InjectRepository(Bucket)
    private repository: Repository<Bucket>,
  ) {}

  create(
    type: string,
    actionType: string,
    referenceId: string,
    extraInfo: string
  ): Promise<Bucket> {
    const bucket = this.repository.create({
      type,
      actionType,
      referenceId,
      extraInfo
    });
    return this.repository.save(bucket);
  }

  fetch(options?: FindManyOptions<Bucket>): Promise<Bucket[]> {
    return this.repository.find(options);
  }

  fetchById(id: string): Promise<Bucket> {
    return this.repository.findOneByOrFail({ id });
  }

  updateById(id: string, bucket: Partial<Bucket>): Promise<UpdateResult> {
    return this.repository.update(id, bucket);
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.repository.softDelete(id);
  }

}

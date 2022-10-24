import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { PostFilterRule } from 'src/domain/business/slices/feed/models';
import { PostFilterRuleNotFoundDomainException } from 'src/domain/business/slices/feed/exceptions';

@Injectable()
export class PostFilterRuleRepository {

  constructor(
    @InjectRepository(PostFilterRule)
    private readonly repository: Repository<PostFilterRule>,
  ) {}

  create(
    pictureId: string,
    label: string,
    hidden: boolean
  ): Promise<PostFilterRule> {
    const post = this.repository.create({
      pictureId,
      label,
      hidden
    });
    return this.repository.save(post);
  }

  fetch(options?: FindManyOptions<PostFilterRule>): Promise<PostFilterRule[]> {
    return this.repository.find(options);
  }

  fetchById(id: string): Promise<PostFilterRule> {
    try {
      return this.repository.findOneByOrFail({ 
        id,
        hidden: false
      });
    } catch (error) {
      throw new PostFilterRuleNotFoundDomainException();
    }
  }

  updateById(id: string, post: Partial<PostFilterRule>): Promise<UpdateResult> {
    return this.repository.update(id, post);
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

}

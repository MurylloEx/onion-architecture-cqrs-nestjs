import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { Pet } from 'src/domain/business/slices/pet/models';
import { User } from 'src/domain/business/slices/user/models';
import { Post } from 'src/domain/business/slices/feed/models';
import { PostType } from 'src/domain/business/slices/feed/types';
import { PostNotFoundDomainException } from 'src/domain/business/slices/feed/exceptions';

@Injectable()
export class PostRepository {

  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
  ) {}

  create(
    pet: Pet,
    user: User,
    offset: number,
    type: PostType,
    reports: number,
    pictureId: string,
    localization: string,
    description: string,
    lostCircumstance?: string,
    lostDate?: Date,
    lostReward?: number
  ): Promise<Post> {
    const post = this.repository.create({
      pet,
      user,
      offset,
      type,
      reports,
      pictureId,
      localization,
      description,
      lostCircumstance,
      lostDate,
      lostReward
    });
    return this.repository.save(post);
  }

  fetch(options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.repository.find(options);
  }

  fetchById(id: string): Promise<Post> {
    try {
      return this.repository.findOneOrFail({
        where: { id },
        relations: ['user', 'pet']
      });
    } catch (error) {
      throw new PostNotFoundDomainException();
    }
  }

  fetchLast(): Promise<Post> {
    return this.repository.findOne({
      where: {},
      order: {
        offset: 'DESC'
      },
    });
  }

  updateById(id: string, post: Partial<Post>): Promise<UpdateResult> {
    return this.repository.update(id, post);
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  deleteByUserId(userId: string): Promise<UpdateResult> {
    return this.repository.softDelete({
      user: { id: userId }
    });
  }

}

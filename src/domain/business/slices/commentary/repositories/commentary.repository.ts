import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { Post } from 'src/domain/business/slices/feed/models';
import { User } from 'src/domain/business/slices/user/models';
import { Commentary } from 'src/domain/business/slices/commentary/models';
import { CommentaryNotFoundDomainException } from 'src/domain/business/slices/commentary/exceptions';

@Injectable()
export class CommentaryRepository {

  constructor(
    @InjectRepository(Commentary)
    private readonly repository: Repository<Commentary>,
  ) {}

  create(user: User, post: Post, text: string): Promise<Commentary> {
    const commentary = this.repository.create({ user, post, text });
    return this.repository.save(commentary);
  }

  fetch(options?: FindManyOptions<Commentary>): Promise<Commentary[]> {
    return this.repository.find(options);
  }

  fetchById(id: string): Promise<Commentary> {
    try {
      return this.repository.findOneOrFail({
        relations: ['user'],
        where: { id }
      });
    } catch (error) {
      throw new CommentaryNotFoundDomainException();
    }
  }

  fetchByUserId(id: string): Promise<Commentary[]> {
    return this.repository.find({
      relations: ['user'],
      where: {
        user: { id },
      }
    });
  }

  fetchByPostId(id: string): Promise<Commentary[]> {
    return this.repository.find({
      relations: ['user'],
      where: {
        post: { id },
      },
      order: {
        createdAt: 'ASC'
      }
    });
  }

  updateById(id: string, commentary: Partial<Commentary>): Promise<UpdateResult> {
    return this.repository.update(id, commentary);
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  countByPeriodAndPostId(postId: string, startDate: Date, endDate: Date): Promise<number> {
    return this.repository.count({
      where: {
        post: { id: postId },
        createdAt: Between(startDate, endDate)
      }
    });
  }

}

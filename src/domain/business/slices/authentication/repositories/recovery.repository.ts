import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/domain/business/slices/user';
import { Recovery } from 'src/domain/business/slices/authentication/models';
import { RecoveryNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@Injectable()
export class RecoveryRepository {

  constructor(
    @InjectRepository(Recovery)
    private readonly repository: Repository<Recovery>,
  ) {}

  create(
    user: User, 
    code: string
  ): Promise<Recovery> {
    const recovery = this.repository.create({ user, code });
    return this.repository.save(recovery);
  }

  fetch(options?: FindManyOptions<Recovery>): Promise<Recovery[]> {
    return this.repository.find(options);
  }

  fetchById(id: string): Promise<Recovery> {
    try {
      return this.repository.findOneByOrFail({ id });
    } catch (error: any) {
      throw new RecoveryNotFoundDomainException();
    }
  }

  fetchByCode(code: string): Promise<Recovery> {
    try {
      return this.repository.findOneByOrFail({ code });
    } catch (error: any) {
      throw new RecoveryNotFoundDomainException();
    }
  }

  async verifyIfExists(userId: string): Promise<boolean> {
    return await this.repository.countBy({ user: { id: userId } }) > 0;
  }

  countByCode(code: string): Promise<number> {
    return this.repository.countBy({ code });
  }

  updateById(id: string, recovery: Partial<Recovery>): Promise<UpdateResult> {
    return this.repository.update(id, recovery);
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

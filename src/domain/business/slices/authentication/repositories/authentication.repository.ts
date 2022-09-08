import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/domain/business/slices/user';
import { Authentication } from 'src/domain/business/slices/authentication/models';
import { AuthenticationNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@Injectable()
export class AuthenticationRepository {

  constructor(
    @InjectRepository(Authentication)
    private readonly repository: Repository<Authentication>,
  ) {}

  create(
    user: User, 
    ipAddress: string, 
    jwt: string
  ): Promise<Authentication> {
    const authentication = this.repository.create({ user, ipAddress, jwt });
    return this.repository.save(authentication);
  }

  fetch(options?: FindManyOptions<Authentication>): Promise<Authentication[]> {
    return this.repository.find(options);
  }

  fetchById(id: string): Promise<Authentication> {
    try {
      return this.repository.findOneByOrFail({ id });
    } catch (error: any) {
      throw new AuthenticationNotFoundDomainException();
    }
  }

  updateById(id: string, authentication: Partial<Authentication>): Promise<UpdateResult> {
    return this.repository.update(id, authentication);
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

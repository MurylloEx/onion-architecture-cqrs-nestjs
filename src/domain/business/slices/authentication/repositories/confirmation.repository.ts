import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/domain/business/slices/user';
import { Confirmation } from 'src/domain/business/slices/authentication/models';
import { ConfirmationNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@Injectable()
export class ConfirmationRepository {

  constructor(
    @InjectRepository(Confirmation)
    private readonly repository: Repository<Confirmation>,
  ) {}

  create(user: User, code: string): Promise<Confirmation> {
    const confirmation = this.repository.create({ user, code });
    return this.repository.save(confirmation);
  }

  fetch(options?: FindManyOptions<Confirmation>): Promise<Confirmation[]> {
    return this.repository.find(options);
  }

  fetchByCode(code: string): Promise<Confirmation> {
    try {
      return this.repository.findOneByOrFail({ code });
    } catch (error: any) {
      throw new ConfirmationNotFoundDomainException();
    }
  }

  fetchById(id: string): Promise<Confirmation> {
    try {
      return this.repository.findOneByOrFail({ id });
    } catch (error: any) {
      throw new ConfirmationNotFoundDomainException();
    }
  }

  async fetchByUserId(id: string): Promise<boolean> {
    try {
      return await this.repository.countBy({ 
        user: { id } 
      }) == 0;
    } catch (error: any) {
      throw new ConfirmationNotFoundDomainException();
    }
  }

  async verifyIfExists(code: string): Promise<boolean> {
    return await this.repository.countBy({ code }) > 0;
  }

  updateById(id: string, confirmation: Partial<Confirmation>): Promise<UpdateResult> {
    return this.repository.update(id, confirmation);
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

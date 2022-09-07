import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/domain/business/slices/user/models';
import { UserNotFoundDomainException } from '../exceptions';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(
    fullName: string,
    nickName: string,
    phone: string,
    email: string,
    password: string,
    descriptor: number,
    pushToken: string,
    pictureId: string
  ): Promise<User> {
    const user = this.repository.create({
      fullName,
      nickName,
      phone,
      email,
      password,
      descriptor,
      pushToken,
      pictureId
    });
    return this.repository.save(user);
  }

  fetch(options?: FindManyOptions<User>): Promise<User[]> {
    try {
      return this.repository.find(options);
    } catch (error: any) {
      throw new UserNotFoundDomainException();
    }
  }

  fetchById(id: string): Promise<User> {
    try {
      return this.repository.findOneByOrFail({ id });
    } catch (error: any) {
      throw new UserNotFoundDomainException();
    }
  }

  fetchByEmail(email: string): Promise<User> {
    try {
      return this.repository.findOneByOrFail({ email });
    } catch (error: any) {
      throw new UserNotFoundDomainException();
    }
  }

  fetchByNickName(nickName: string): Promise<User> {
    try {
      return this.repository.findOneByOrFail({ nickName });
    } catch (error: any) {
      throw new UserNotFoundDomainException();
    }
  }

  fetchByRecoveryCode(code: string): Promise<User> {
    try {
      return this.repository.findOneByOrFail({
        recoveries: {
          code
        }
      });
    } catch (error: any) {
      throw new UserNotFoundDomainException();
    }
  }

  async verifyIfUserExistsByEmailOrNickName(
    email: string, 
    nickName: string
  ): Promise<boolean> 
  {
    return await this.repository.countBy([
      { email },
      { nickName }
    ]) > 0;
  }

  updateById(id: string, user: Partial<User>): Promise<UpdateResult> {
    return this.repository.update(id, user);
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

}

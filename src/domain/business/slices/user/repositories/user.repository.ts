import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/domain/business/slices/user/models';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  create(
    fullName: string,
    nickName: string,
    phone: string,
    email: string,
    password: string,
    pushToken: string,
    pictureId: string
  ): Promise<User> {
    const user = this.repository.create({
      fullName,
      nickName,
      phone,
      email,
      password,
      pushToken,
      pictureId
    });
    return this.repository.save(user);
  }

  fetch(options?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find(options);
  }

  fetchById(id: string): Promise<User> {
    return this.repository.findOneByOrFail({ id });
  }

  updateById(id: string, user: Partial<User>): Promise<UpdateResult> {
    return this.repository.update(id, user);
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

}

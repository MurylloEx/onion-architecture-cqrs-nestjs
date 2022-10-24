import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository, UpdateResult } from 'typeorm';

import { Establishment } from 'src/domain/business/slices/establishment/models';

@Injectable()
export class EstablishmentRepository {

  constructor(
    @InjectRepository(Establishment)
    private repository: Repository<Establishment>,
  ) {}

  fetch(options?: FindManyOptions<Establishment>): Promise<Establishment[]> {
    return this.repository.find(options);
  }

  fetchById(id: string): Promise<Establishment> {
    return this.repository.findOneByOrFail({ id });
  }

  updateById(id: string, establishment: Partial<Establishment>): Promise<UpdateResult> {
    return this.repository.update(id, establishment);
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.repository.softDelete(id);
  }

}

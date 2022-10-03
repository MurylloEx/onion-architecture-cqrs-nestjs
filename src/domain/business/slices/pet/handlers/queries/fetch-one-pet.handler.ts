import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Pet } from 'src/domain/business/slices/pet/models';
import { FetchOnePetQuery } from 'src/domain/business/slices/pet/queries';
import { PetRepository } from 'src/domain/business/slices/pet/repositories';

@QueryHandler(FetchOnePetQuery)
export class FetchOnePetHandler implements IQueryHandler<FetchOnePetQuery> {

  constructor(private readonly repository: PetRepository) {}

  async execute(query: FetchOnePetQuery): Promise<Pet> {
    return await this.repository.fetchById(query.id);
  }

}

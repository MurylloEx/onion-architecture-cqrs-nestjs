import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Pet } from 'src/domain/business/slices/pet/models';
import { FetchOwnPetsQuery } from 'src/domain/business/slices/pet/queries';
import { PetRepository } from 'src/domain/business/slices/pet/repositories';

@QueryHandler(FetchOwnPetsQuery)
export class FetchOwnPetsHandler implements IQueryHandler<FetchOwnPetsQuery> {

  constructor(private readonly repository: PetRepository) {}

  async execute(query: FetchOwnPetsQuery): Promise<Pet[]> {
    return await this.repository.fetchByUserId(query.userId);
  }

}

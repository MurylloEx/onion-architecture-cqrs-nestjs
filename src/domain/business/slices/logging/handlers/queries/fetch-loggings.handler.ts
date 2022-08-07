import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Logging } from 'src/domain/business/slices/logging/models';
import { FetchLoggingsQuery } from 'src/domain/business/slices/logging/queries';
import { LoggingRepository } from 'src/domain/business/slices/logging/repositories';

@QueryHandler(FetchLoggingsQuery)
export class FetchLoggingsHandler implements IQueryHandler<FetchLoggingsQuery> {

  constructor(private repository: LoggingRepository) {}

  async execute(query: FetchLoggingsQuery): Promise<Logging[]> {
    return await this.repository.fetch(query.options);
  }

}

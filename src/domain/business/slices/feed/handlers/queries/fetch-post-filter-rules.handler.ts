import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PostFilterRule } from 'src/domain/business/slices/feed/models';
import { FetchPostFilterRulesQuery } from 'src/domain/business/slices/feed/queries';
import { PostFilterRuleRepository } from 'src/domain/business/slices/feed/repositories';

@QueryHandler(FetchPostFilterRulesQuery)
export class FetchPostFilterRulesHandler implements IQueryHandler<FetchPostFilterRulesQuery> {

  constructor(private readonly repository: PostFilterRuleRepository) {}

  async execute(): Promise<PostFilterRule[]> {
    return await this.repository.fetch({
      where: {
        hidden: false
      }
    });
  }

}

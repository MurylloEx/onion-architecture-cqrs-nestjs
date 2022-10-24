import { Injectable } from '@nestjs/common';
import { EstablishmentDto } from 'src/common/dto';
import { EstablishmentDomainService } from 'src/domain';

@Injectable()
export class EstablishmentService {

  constructor(
    private readonly establishmentDomainService: EstablishmentDomainService
  ) {}

  async fetch(): Promise<EstablishmentDto[]> {
    const entities = await this.establishmentDomainService.fetch();
    return entities.map(entity => entity.toDto(EstablishmentDto));
  }

}

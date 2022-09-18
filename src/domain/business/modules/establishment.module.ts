import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { 
  FetchEstablishmentsHandler 
} from 'src/domain/business/slices/establishment';

import { 
  Establishment, 
  EstablishmentDomainService, 
  EstablishmentRepository
} from 'src/domain/business/slices/establishment';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Establishment])
  ],
  providers: [
    FetchEstablishmentsHandler,
    EstablishmentRepository,
    EstablishmentDomainService
  ],
  exports: [EstablishmentDomainService]
})
export class EstablishmentModule { }

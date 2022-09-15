import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreatePetHandler,
  DeletePetHandler,
  FetchOwnPetsHandler,
} from 'src/domain/business/slices/pet';

import { 
  Pet, 
  PetDomainService, 
  PetRepository,
} from 'src/domain/business/slices/pet';

import { UserModule } from './user.module';
import { BucketModule } from './bucket.module';

@Module({
  imports: [
    CqrsModule,
    UserModule,
    BucketModule,
    TypeOrmModule.forFeature([Pet])
  ],
  providers: [
    CreatePetHandler,
    DeletePetHandler,
    FetchOwnPetsHandler,
    PetRepository,
    PetDomainService
  ],
  exports: [PetDomainService]
})
export class PetModule { }

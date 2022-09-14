import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';

import { Pet } from 'src/domain/business/slices/pet/models';
import { FetchOwnPetsQuery } from 'src/domain/business/slices/pet/queries';

import { 
  DeletePetCommand, 
  CreatePetCommandBuilder 
} from 'src/domain/business/slices/pet/commands';

@Injectable()
export class PetDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  fetchOwnPets(userId: string): Promise<Pet[]> {
    const query = new FetchOwnPetsQuery(userId);
    return this.queryBus.execute<IQuery, Pet[]>(query);
  }

  createPet(
    userId: string,
    name: string,
    species: string,
    breed: string,
    place: string,
    color: string,
    sex: string,
    age: number,
    hasPedigree: boolean,
    description: string,
    habits: string,
    allergies: string,
    fears: string,
    pictureBuffer: Buffer
  ): Promise<Pet> {
    const command = new CreatePetCommandBuilder()
      .withUserId(userId)
      .withName(name)
      .withSpecies(species)
      .withBreed(breed)
      .withPlace(place)
      .withColor(color)
      .withSex(sex)
      .withAge(age)
      .withHasPedigree(hasPedigree)
      .withDescription(description)
      .withHabits(habits)
      .withAllergies(allergies)
      .withFears(fears)
      .withPictureBuffer(pictureBuffer)
      .build();
    return this.commandBus.execute<ICommand, Pet>(command);
  }

  deletePet(id: string): Promise<Pet> {
    const command = new DeletePetCommand(id);
    return this.commandBus.execute<ICommand, Pet>(command);
  }

}

import { Injectable } from '@nestjs/common';
import { CreatePetDto } from 'src/common/dto';
import { PetDomainService } from 'src/domain';

@Injectable()
export class PetService {

  constructor(
    private readonly petDomainService: PetDomainService
  ) { }

  fetchOwnPets(userId: string) {
    return this.petDomainService.fetchOwnPets(userId);
  }

  createPet(userId: string, pet: CreatePetDto) {
    return this.petDomainService.createPet(
      userId,
      pet.name,
      pet.species,
      pet.breed,
      pet.place,
      pet.color,
      pet.sex,
      pet.age,
      pet.description,
      pet.habits,
      pet.allergies,
      pet.fears,
      pet.pictureBuffer
    );
  }

  deletePet(id: string) {
    return this.petDomainService.deletePet(id);
  }

}

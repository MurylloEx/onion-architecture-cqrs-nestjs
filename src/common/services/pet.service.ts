import { Injectable } from '@nestjs/common';
import { CreatePetDto, PetDto } from 'src/common/dto';
import { PetDomainService } from 'src/domain';

@Injectable()
export class PetService {

  constructor(
    private readonly petDomainService: PetDomainService
  ) { }

  async fetchOwnPets(userId: string): Promise<PetDto[]> {
    const entities = await this.petDomainService.fetchOwnPets(userId);
    return entities.map(entity => entity.toDto(PetDto));
  }

  async createPet(userId: string, pet: CreatePetDto): Promise<PetDto> {
    const entity = await this.petDomainService.createPet(
      userId,
      pet.name,
      pet.species,
      pet.breed,
      pet.place,
      pet.color,
      pet.sex,
      pet.age,
      pet.hasPedigree,
      pet.description,
      pet.habits,
      pet.allergies,
      pet.fears,
      pet.pictureBuffer
    );
    return entity.toDto(PetDto);
  }

  async deletePet(id: string): Promise<PetDto> {
    const entity = await this.petDomainService.deletePet(id);
    return entity.toDto(PetDto);
  }

}

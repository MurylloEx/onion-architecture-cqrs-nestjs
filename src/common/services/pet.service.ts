import { Injectable } from '@nestjs/common';
import { CreatePetDto, PetDto } from 'src/common/dto';
import { PetDomainService } from 'src/domain';

@Injectable()
export class PetService {

  constructor(
    private readonly petDomainService: PetDomainService
  ) { }

  async fetchOwn(userId: string): Promise<PetDto[]> {
    const entities = await this.petDomainService.fetchOwn(userId);
    return entities.map(entity => entity.toDto(PetDto));
  }

  async fetchPetDetails(id: string): Promise<PetDto | null> {
    try {
      const entity = await this.petDomainService.fetchById(id);
      return entity.toDto(PetDto);
    } catch (error) {
      return null;
    }
  }

  async create(userId: string, pet: CreatePetDto): Promise<PetDto> {
    const entity = await this.petDomainService.create(
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

  async deleteById(id: string): Promise<PetDto> {
    const entity = await this.petDomainService.deleteById(id);
    return entity.toDto(PetDto);
  }

}

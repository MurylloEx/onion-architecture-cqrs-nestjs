import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from 'src/domain/business/slices/user';
import { Pet } from 'src/domain/business/slices/pet/models';

@Injectable()
export class PetRepository {

  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>
  ) {}

  create(
    user: User,
    name: string,
    species: string,
    breed: string,
    place: string,
    color: string,
    sex: string,
    age: number,
    description: string,
    habits: string,
    allergies: string,
    fears: string,
    pictureId: string
  ): Promise<Pet> {
    const pet = this.repository.create({
      user,
      name,
      species,
      breed,
      place,
      color,
      sex,
      age,
      description,
      habits,
      allergies,
      fears,
      pictureId
    });
    return this.repository.save(pet);
  }

  fetch(): Promise<Pet[]> {
    return this.repository.find();
  }

  fetchById(id: string): Promise<Pet> {
    return this.repository.findOneByOrFail({ id });
  }

  fetchByUserId(userId: string): Promise<Pet[]> {
    return this.repository.find({
      where: {
        user: { id: userId }
      }
    });
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  deleteFromUserById(userId: string, id: string): Promise<UpdateResult> {
    return this.repository.softDelete({
      id,
      user: { id: userId }
    });
  }

}

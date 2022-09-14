import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Pet } from 'src/domain/business/slices/pet/models';
import { BucketDomainService } from 'src/domain/business/slices/bucket';
import { CreatePetCommand } from 'src/domain/business/slices/pet/commands';
import { PetRepository } from 'src/domain/business/slices/pet/repositories';
import { UserDomainService } from 'src/domain/business/slices/user/services';
import { CannotCreatePetDomainException } from 'src/domain/business/slices/pet/exceptions';

@CommandHandler(CreatePetCommand)
export class CreatePetHandler implements ICommandHandler<CreatePetCommand> {

  constructor(
    private readonly repository: PetRepository,
    private readonly userDomainService: UserDomainService,
    private readonly bucketDomainService: BucketDomainService,
  ) { }

  async execute(command: CreatePetCommand): Promise<Pet> {
    const user = await this.userDomainService.fetchById(command.userId);
    const picture = await this.bucketDomainService.createImage(
      command.pictureBuffer,
      command.name,
      command.description
    );

    try {
      return await this.repository.create(
        user,
        command.name,
        command.species,
        command.breed,
        command.place,
        command.color,
        command.sex,
        command.age,
        command.hasPedigree,
        command.description,
        command.habits,
        command.allergies,
        command.fears,
        picture.id
      );
    } catch (error) {
      throw new CannotCreatePetDomainException();
    }
  }

}

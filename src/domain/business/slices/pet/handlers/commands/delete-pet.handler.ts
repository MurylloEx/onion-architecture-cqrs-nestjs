import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Pet } from 'src/domain/business/slices/pet/models';
import { DeletePetCommand } from 'src/domain/business/slices/pet/commands';
import { PetRepository } from 'src/domain/business/slices/pet/repositories';
import { PetNotFoundDomainException } from 'src/domain/business/slices/pet/exceptions';

@CommandHandler(DeletePetCommand)
export class DeletePetHandler implements ICommandHandler<DeletePetCommand> {

  constructor(private readonly repository: PetRepository) {}

  async execute(command: DeletePetCommand): Promise<Pet> {
    const pet = await this.repository.fetchById(command.id);
    const deleteResult = await this.repository.deleteById(command.id);

    if (deleteResult.affected === 0) {
      throw new PetNotFoundDomainException();
    }

    return pet;
  }

}

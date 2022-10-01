import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { PetService } from 'src/common/services';
import { Security, Permissions, Jwt, JwtDto, CreatePetDto, Access, PetDto } from 'src/common';

@ApiTags('Pets')
@Security()
@Controller('/pet')
export class PetController {

  constructor(private readonly petService: PetService) { }

  @Get('/me')
  @Permissions(Access.READ_OWN_PETS)
  fetchOwnPets(@Jwt() jwt: JwtDto): Promise<PetDto[]> {
    return this.petService.fetchOwn(jwt.id);
  }

  @Post('/create')
  @Permissions(Access.CREATE_PET)
  createPet(@Jwt() jwt: JwtDto, @Body() body: CreatePetDto): Promise<PetDto> {
    return this.petService.create(jwt.id, body);
  }

  @Delete('/delete/:id')
  @Permissions(
    Access.READ_OWN_PETS, 
    Access.DELETE_PET
  )
  deletePet(@Param('id') petId: string): Promise<PetDto> {
    return this.petService.delete(petId);
  }

}

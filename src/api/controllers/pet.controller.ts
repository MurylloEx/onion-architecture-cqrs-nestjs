import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PetService } from 'src/common/services';
import { Security, Permissions, Jwt, JwtDto, CreatePetDto, Access } from 'src/common';

@ApiTags('Pets')
@Security()
@Controller('/pet')
export class PetController {

  constructor(private readonly petService: PetService) { }

  @Get('/me')
  @Permissions(Access.FETCH_OWN_PETS)
  fetchOwnPets(@Jwt() jwt: JwtDto) {
    return this.petService.fetchOwnPets(jwt.id);
  }

  @Post('/create')
  @Permissions(Access.CREATE_PET)
  createPet(@Jwt() jwt: JwtDto, @Body() body: CreatePetDto) {
    return this.petService.createPet(jwt.id, body);
  }

  @Get('/delete/:id')
  @Permissions(
    Access.FETCH_OWN_PETS, 
    Access.DELETE_PET
  )
  deletePet(@Param('id') petId: string) {
    return this.petService.deletePet(petId);
  }

}

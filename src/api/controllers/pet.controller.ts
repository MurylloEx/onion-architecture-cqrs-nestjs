import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';

import { PetService } from 'src/common/services';
import {
  Jwt,
  Access,
  Security,
  Permissions,
  JwtDto,
  PetDto,
  CreatePetDto,
  IgnoreAppVersion,
  IgnoreResponseDefault
} from 'src/common';

@ApiTags('Pets')
@Security()
@Controller('/pet')
export class PetController {

  constructor(private readonly petService: PetService) { }

  @IgnoreAppVersion()
  @IgnoreResponseDefault()
  @Render('pet-details')
  @Get('/:id/detail')
  async showPetDetails(@Param('id') id: string): Promise<object> {
    const pet = await this.petService.fetchPetDetails(id);
    return { pet };
  }

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
    return this.petService.deleteById(petId);
  }

}

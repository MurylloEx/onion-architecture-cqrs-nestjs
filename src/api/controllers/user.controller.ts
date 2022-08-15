import { ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { UpdateUserDto } from 'src/common/dto';
import { UserService } from 'src/common/services';
import { Access, Security, Permissions, User, AppVersion, UserDto } from 'src/common';

@Security()
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @Permissions(
    Access.READ_USER, 
    Access.READ_ANOTHER_USER
  )
  fetch() {
    //Listar todos os perfis de usuários do sistema
  }

  @Get('me')
  @Permissions(Access.READ_USER)
  fetchSelf(@User() user: UserDto, @AppVersion() version: string) {
    //Visualizar próprio perfil
  }

  @Get(':id')
  @Permissions(
    Access.READ_USER, 
    Access.READ_ANOTHER_USER
  )
  fetchOne(@Param('id') id: string): Promise<Partial<UserDto>> {
    return this.userService.fetchOne(id);
  }

  @ApiOperation({description: 'Atualiza as informações do usuário' })
  @Patch('me')
  @Permissions(
    Access.UPDATE_USER,
    Access.READ_USER
  )
  updatePartially(@User() user: UserDto, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(user.id, body);
  }

}

import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from 'src/common/services';
import { Access, Security, Permissions, Jwt, JwtDto, AppVersion, UserDto } from 'src/common';

@Security()
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  @Permissions(Access.READ_USER)
  fetchSelf(@Jwt() jwt: JwtDto, @AppVersion() version: string) {
    //Visualizar próprio perfil
  }

  @Get(':id')
  @Permissions(
    Access.READ_USER,
    Access.READ_ANOTHER_USER
  )
  fetchOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.fetchOne(id);
  }

  @Get('all')
  @Permissions(
    Access.READ_USER,
    Access.READ_ANOTHER_USER
  )
  fetch() {
    //Listar todos os perfis de usuários do sistema
  }

  @Patch()
  @Permissions(
    Access.UPDATE_USER,
    Access.READ_USER
  )
  updatePartially() {
    //Atualizar parcialmente o perfil do usuário
  }

}

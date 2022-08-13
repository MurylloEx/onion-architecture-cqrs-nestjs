import { Controller, Get, Param, Patch } from '@nestjs/common';
import { Access, Security, Permissions, User, AppVersion, UserDto } from 'src/common';
import { UserService } from 'src/common/services';

@Security()
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @Permissions(Access.READ_USER)
  fetchSelf(@User() user: UserDto, @AppVersion() version: string) {
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

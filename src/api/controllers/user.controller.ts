import { Controller, Get, Post } from '@nestjs/common';
import { Access, Security, Permissions } from 'src/common';
import { UserService } from 'src/common/services/user.service';

@Security()
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @Permissions(Access.READ_USER)
  fetchSelf() {
    //Visualizar próprio perfil
  }

  @Get()
  @Permissions(
    Access.READ_USER, 
    Access.READ_ANOTHER_USER
  )
  fetchOne() {
    //Visualizar perfil de outro usuário
  }

  @Get()
  @Permissions(
    Access.READ_USER, 
    Access.READ_ANOTHER_USER
  )
  fetch() {
    //Visualizar vários perfis por um conjunto de ids
  }

}

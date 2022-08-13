import { Body, Controller, Get, HttpCode, Param, Patch, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Access, Security, Permissions, User, AppVersion, UserDto, UpdatePasswordDto } from 'src/common';
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

  @ApiOperation({ summary: "Atualiza a senha do usuário" })
  @Put("password")
  //@Permissions(Access.UPDATE_PASSWORD)
  @HttpCode(204)
  updatePassword(
    @Body() data: UpdatePasswordDto,
    //@Res({ passthrough: true }) { user }: any
  ) {
    //return this.userService.updatePassword(user.id, data);
    return this.userService.updatePassword('1', data);
  }

}

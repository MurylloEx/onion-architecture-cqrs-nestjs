import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { UpdateUserDto } from 'src/common/dto';
import { UserService } from 'src/common/services';
import { Access, Security, Permissions, Jwt, JwtDto, UserDto } from 'src/common';

@Security()
@Controller('/user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('/all')
  @Permissions(
    Access.READ_USER,
    Access.READ_ANOTHER_USER
  )
  fetch() {
    return this.userService.fetch();
  }

  @Get('/me')
  @Permissions(Access.READ_USER)
  fetchSelf(@Jwt() jwt: JwtDto) {
    return this.userService.fetchOne(jwt.id);
  }

  @Get('/:id')
  @Permissions(
    Access.READ_USER,
    Access.READ_ANOTHER_USER
  )
  fetchOne(@Param('id') id: string): Promise<Partial<UserDto>> {
    return this.userService.fetchOne(id);
  }

  @Patch('/me')
  @Permissions(
    Access.UPDATE_USER,
    Access.READ_USER
  )
  updatePartially(@Jwt() jwt: JwtDto, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(jwt.id, body);
  }

}

import { Injectable } from '@nestjs/common';
import { UserDomainService } from 'src/domain';
import { UpdateUserDto, UserDto } from 'src/common/dto';

@Injectable()
export class UserService {

  constructor(private readonly userDomainService: UserDomainService) { }

  fetch(): Promise<UserDto[]> {
    return this.userDomainService.fetch();
  }

  fetchOne(id: string): Promise<UserDto> {
    return this.userDomainService.fetchById(id);
  }

  updateUser(userId: string, data: UpdateUserDto) {
    return this.userDomainService.updateById(userId, data);
  }

}

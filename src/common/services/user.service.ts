import { Injectable } from '@nestjs/common';
import { UserDomainService } from 'src/domain';
import { UpdatePasswordDto, UserDto } from 'src/common/dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(private readonly userDomainService: UserDomainService) {}

  fetch(): Promise<Partial<UserDto>[]> {
    return this.userDomainService.fetch();
  }

  fetchOne(id: string): Promise<Partial<UserDto>> {
    return this.userDomainService.fetchById(id);
  }

  updatePassword(userId: string, data: UpdatePasswordDto) {
    return this.userDomainService.updatePassword(userId, data.code, data.password);
  }

  updateUser(userId: string, data: UpdateUserDto) {
    return this.userDomainService.updateById(userId, data);
  }
}

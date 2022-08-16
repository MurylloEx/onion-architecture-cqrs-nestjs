import { Injectable } from '@nestjs/common';
import { UserDomainService } from 'src/domain';
import { UpdateUserDto, UserDto } from 'src/common/dto';

@Injectable()
export class UserService {

  constructor(private readonly userDomainService: UserDomainService) { }

  async fetch(): Promise<UserDto[]> {
    const entities = await this.userDomainService.fetch();
    return entities.map(entity => entity.toDto(UserDto));
  }

  async fetchOne(id: string): Promise<UserDto> {
    const entity = await this.userDomainService.fetchById(id);
    return entity.toDto(UserDto);
  }

  async updateUser(userId: string, data: UpdateUserDto): Promise<UserDto> {
    const entity = await this.userDomainService.updateById(userId, data);
    return entity.toDto(UserDto);
  }

}

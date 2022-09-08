import { Injectable } from '@nestjs/common';
import { UserDomainService } from 'src/domain';
import { UpdateUserDto, UpdateUserProfileDto, UserDto } from 'src/common/dto';

@Injectable()
export class UserService {

  constructor(
    private readonly userDomainService: UserDomainService
  ) {}

  async fetch(): Promise<UserDto[]> {
    const entities = await this.userDomainService.fetch();
    return entities.map(entity => entity.toDto(UserDto));
  }

  async fetchOne(id: string): Promise<UserDto> {
    const entity = await this.userDomainService.fetchById(id);
    return entity.toDto(UserDto);
  }

  async updateById(userId: string, user: UpdateUserDto): Promise<UserDto> {
    const entity = await this.userDomainService.updateById(userId, user);
    return entity.toDto(UserDto);
  }

  async updateProfileById(userId: string, user: UpdateUserProfileDto): Promise<UserDto> {
    const entity = await this.userDomainService.updateProfileById(
      userId,
      user.fullName,
      user.nickName,
      user.phone,
      user.email,
      user.pictureBuffer
    );
    return entity.toDto(UserDto);
  }

}

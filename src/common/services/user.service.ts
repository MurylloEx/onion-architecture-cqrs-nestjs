import { Injectable } from '@nestjs/common';
import { UserDomainService } from 'src/domain';
import { UserDto } from 'src/common/dto';

@Injectable()
export class UserService {

  constructor(private readonly userDomainService: UserDomainService) {}

  fetch(): Promise<UserDto[]> {
    return this.userDomainService.fetch();
  }

  fetchOne(id: string): Promise<UserDto> {
    return this.userDomainService.fetchById(id);
  }

}

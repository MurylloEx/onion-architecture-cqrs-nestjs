import { Injectable } from '@nestjs/common';
import { UserDomainService } from 'src/domain';

@Injectable()
export class UserService {

  constructor(private readonly userDomainService: UserDomainService) {}

}

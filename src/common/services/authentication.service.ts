import { Injectable } from '@nestjs/common';
import { AuthenticationDomainService } from 'src/domain';
import { AuthenticationDto, UserDto, UserSignInDto, UserSignUpDto } from 'src/common/dto';

@Injectable()
export class AuthenticationService {
  
  constructor(
    private readonly authenticationDomainService: AuthenticationDomainService
  ) {}

  async registerUser(user: UserSignUpDto): Promise<UserDto> {
    const entity = await this.authenticationDomainService.registerUser(
      user.fullName,
      user.nickName,
      user.phone,
      user.email,
      user.password,
      user.pushToken,
      user.pictureBuffer
    );
    return entity.toDto(UserDto);
  }

  async authenticateUser(credentials: UserSignInDto, ipAddress: string): Promise<AuthenticationDto> {
    const entity = await this.authenticationDomainService.authenticateUser(
      credentials.email, 
      credentials.password,
      credentials.pushToken,
      ipAddress
    );
    return entity.toDto(AuthenticationDto);
  }

}

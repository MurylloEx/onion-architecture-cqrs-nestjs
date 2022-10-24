import { compare } from 'bcrypt';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from 'src/domain/business/slices/user';
import { Authentication } from 'src/domain/business/slices/authentication/models';
import { JwtDomainService } from 'src/domain/business/slices/authentication/services';
import { AuthenticateUserCommand } from 'src/domain/business/slices/authentication/commands';

import { 
  AccountNotConfirmedYetDomainException, 
  InvalidUserCredentialsDomainException 
} from 'src/domain/business/slices/authentication/exceptions';

import { 
  AuthenticationRepository, 
  ConfirmationRepository 
} from 'src/domain/business/slices/authentication/repositories';

@CommandHandler(AuthenticateUserCommand)
export class AuthenticateUserHandler implements ICommandHandler<AuthenticateUserCommand> {

  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly jwtDomainService: JwtDomainService,
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly confirmationRepository: ConfirmationRepository
  ) {}

  async execute(command: AuthenticateUserCommand): Promise<Authentication> {
    try {
      const user = await this.userDomainService.fetchByEmail(command.email);
      const isPasswordValid = await compare(command.password, user.password);

      if (!isPasswordValid) {
        throw new InvalidUserCredentialsDomainException();
      }

      const isConfirmedAccount = await this.confirmationRepository.fetchByUserId(user.id);
  
      if (!isConfirmedAccount) {
        throw new AccountNotConfirmedYetDomainException();
      }
  
      const updatedUser = await this.userDomainService.updateById(user.id, {
        pushToken: command.pushToken
      });
      const token = await this.jwtDomainService.sign(user.id, {...updatedUser});
  
      return await this.authenticationRepository.create(
        updatedUser,
        command.ipAddress,
        token,
      );
    } catch (error) {
      throw new InvalidUserCredentialsDomainException();
    }
  }

}

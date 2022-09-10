import { Injectable } from '@nestjs/common';
import { RecoveryDomainService } from 'src/domain';
import { ChangePasswordDto, RecoveryDto, UserDto } from 'src/common/dto';

@Injectable()
export class RecoveryService {
  
  constructor(
    private readonly recoveryDomainService: RecoveryDomainService
  ) {}

  async requestRecoveryCode(userEmail: string): Promise<RecoveryDto> {
    const entity = await this.recoveryDomainService.requestRecoveryCode(userEmail);
    const recovery: RecoveryDto = entity.toDto(RecoveryDto);

    recovery.user = entity.user.toDto(UserDto);
    return recovery;
  }

  async checkRecoveryCode(recoveryCode: string): Promise<boolean> {
    return await this.recoveryDomainService.checkRecoveryCode(recoveryCode);
  }

  async changePassword(recoveryCode: string, recovery: ChangePasswordDto): Promise<UserDto> {
    const entity = await this.recoveryDomainService.changePassword(recoveryCode, recovery.newPassword);
    return entity.toDto(UserDto);
  }

}

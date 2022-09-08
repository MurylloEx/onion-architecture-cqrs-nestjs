import { Injectable } from '@nestjs/common';
import { RecoveryDomainService } from 'src/domain';
import { RecoveryDto, UserDto } from 'src/common/dto';

@Injectable()
export class RecoveryService {
  
  constructor(
    private readonly recoveryDomainService: RecoveryDomainService
  ) {}

  async requestRecoveryCode(userEmail: string): Promise<RecoveryDto> {
    const entity = await this.recoveryDomainService.requestRecoveryCode(userEmail);
    return entity.toDto(RecoveryDto);
  }

  async checkRecoveryCode(recoveryCode: string): Promise<boolean> {
    return await this.recoveryDomainService.checkRecoveryCode(recoveryCode);
  }

  async changePassword(recoveryCode: string, recovery: RecoveryDto): Promise<UserDto> {
    const entity = await this.recoveryDomainService.changePassword(recoveryCode, recovery.newPassword);
    return entity.toDto(UserDto);
  }

}

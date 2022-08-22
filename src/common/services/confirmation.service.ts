import { Injectable } from '@nestjs/common';
import { ConfirmationDomainService } from 'src/domain';
import { ConfirmationDto } from 'src/common/dto';

@Injectable()
export class ConfirmationService {
  
  constructor(
    private readonly confirmationDomainService: ConfirmationDomainService
  ) {}

  async confirmAccount(confirmationCode: string) {
    const entity = await this.confirmationDomainService.confirmAccount(confirmationCode);
    return entity.toDto(ConfirmationDto);
  }

}

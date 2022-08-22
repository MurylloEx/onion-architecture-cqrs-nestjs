import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class RecoveryNotFoundDomainException extends DomainException {
  constructor() {
    super('Não foi possível encontrar esse código de redefinição de senha no sistema.', HttpStatus.NOT_FOUND);
  }
}

import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class ConfirmationNotFoundDomainException extends DomainException {
  constructor() {
    super('Não foi possível encontrar esse código de confirmação no sistema.', HttpStatus.NOT_FOUND);
  }
}

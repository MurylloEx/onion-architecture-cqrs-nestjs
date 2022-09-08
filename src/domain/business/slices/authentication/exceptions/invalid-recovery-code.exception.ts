import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class InvalidRecoveryCodeDomainException extends DomainException {
  constructor() {
    super('O código de redefinição de senha fornecido é inválido.', HttpStatus.BAD_REQUEST);
  }
}

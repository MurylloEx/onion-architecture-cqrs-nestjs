import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class InvalidUserCredentialsDomainException extends DomainException {
  constructor() {
    super('O endereço de e-mail ou a senha fornecido são inválidos.', HttpStatus.FORBIDDEN);
  }
}

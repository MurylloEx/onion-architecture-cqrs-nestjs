import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class UserAlreadyRegisteredDomainException extends DomainException {
  constructor() {
    super('Já existe um usuário registrado com essa combinação de e-mail e apelido.', HttpStatus.CONFLICT);
  }
}

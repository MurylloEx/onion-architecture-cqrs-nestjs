import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class UserNickNameAlreadyExistsDomainException extends DomainException {
  constructor() {
    super('Já existe um usuário registrado com essa combinação de apelido.', HttpStatus.CONFLICT);
  }
}

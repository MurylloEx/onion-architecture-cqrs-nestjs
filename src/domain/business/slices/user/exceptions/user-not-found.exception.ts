import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class UserNotFoundDomainException extends DomainException {
  constructor() {
    super('O usuário especificado não foi encontrado.', HttpStatus.NOT_FOUND);
  }
}

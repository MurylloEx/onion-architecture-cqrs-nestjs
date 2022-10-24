import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class AuthenticationNotFoundDomainException extends DomainException {
  constructor() {
    super('Não foi possível encontrar o registro desse acesso no sistema.', HttpStatus.NOT_FOUND);
  }
}

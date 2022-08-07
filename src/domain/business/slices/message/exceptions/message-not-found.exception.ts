import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class MessageNotFoundDomainException extends DomainException {
  constructor() {
    super('A mensagem não foi encontrada.', HttpStatus.NOT_FOUND);
  }
}

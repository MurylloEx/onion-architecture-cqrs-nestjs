import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class AccountNotConfirmedYetDomainException extends DomainException {
  constructor() {
    super('Esta conta não foi confirmada ainda.', HttpStatus.FORBIDDEN);
  }
}

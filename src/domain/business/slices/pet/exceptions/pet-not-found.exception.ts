import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class PetNotFoundDomainException extends DomainException {
  constructor() {
    super('O Pet especificado não foi encontrado.', HttpStatus.NOT_FOUND);
  }
}

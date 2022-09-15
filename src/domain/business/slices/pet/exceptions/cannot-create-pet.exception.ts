import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class CannotCreatePetDomainException extends DomainException {
  constructor() {
    super('Não foi possível criar o Pet.', HttpStatus.BAD_REQUEST);
  }
}

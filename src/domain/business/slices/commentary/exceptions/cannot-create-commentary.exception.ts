import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class CannotCreateCommentaryDomainException extends DomainException {
  constructor() {
    super('Não foi possível criar o comentário pois um ou mais campos estão incorretos.', HttpStatus.BAD_REQUEST);
  }
}

import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class CommentaryNotFoundDomainException extends DomainException {
  constructor() {
    super('Não foi possível encontrar o(s) comentário(s) associados no sistema.', HttpStatus.NOT_FOUND);
  }
}

import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class PostNotFoundDomainException extends DomainException {
  constructor() {
    super('Não foi possível encontrar nenhum Post com base na consulta especificada.', HttpStatus.NOT_FOUND);
  }
}

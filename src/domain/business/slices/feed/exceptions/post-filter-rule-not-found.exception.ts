import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class PostFilterRuleNotFoundDomainException extends DomainException {
  constructor() {
    super('Não foi possível encontrar nenhum filtro de Post com base na consulta especificada.', HttpStatus.NOT_FOUND);
  }
}

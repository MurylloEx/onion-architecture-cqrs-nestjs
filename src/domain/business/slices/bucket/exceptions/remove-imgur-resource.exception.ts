import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class RemoveImgurResourceDomainException extends DomainException {
  constructor() {
    super('Não foi possível remover o recurso no bucket do Imgur.', HttpStatus.SERVICE_UNAVAILABLE);
  }
}

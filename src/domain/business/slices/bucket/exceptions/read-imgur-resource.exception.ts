import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class ReadImgurResourceDomainException extends DomainException {
  constructor() {
    super('Não foi possível ler o recurso no bucket do Imgur.', HttpStatus.SERVICE_UNAVAILABLE);
  }
}

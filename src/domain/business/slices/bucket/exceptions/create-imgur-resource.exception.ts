import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class CreateImgurResourceDomainException extends DomainException {
  constructor() {
    super('Não foi possível criar o recurso no bucket do Imgur.', HttpStatus.SERVICE_UNAVAILABLE);
  }
}

import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class UpdateImgurResourceDomainException extends DomainException {
  constructor() {
    super('Não foi possível atualizar o recurso no bucket do Imgur.', HttpStatus.SERVICE_UNAVAILABLE);
  }
}

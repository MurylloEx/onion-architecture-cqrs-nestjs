import { NotFoundException } from '@nestjs/common';

export class NotFoundDomainException extends NotFoundException {

  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description);
  }

}

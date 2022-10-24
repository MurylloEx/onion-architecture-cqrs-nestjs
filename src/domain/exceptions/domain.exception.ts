import { HttpException } from '@nestjs/common';

export class DomainException extends HttpException {
  constructor(response: string | Record<string, any>, status: number) {
    super(response, status);
  }

  getResponse() {
    return {
      name: super.name,
      message: super.getResponse(),
    }
  }
}

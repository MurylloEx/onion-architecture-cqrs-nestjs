import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthorizeGuard } from 'src/common/security/guards';

export const Security = (): ClassDecorator & MethodDecorator => applyDecorators(
  UseGuards(AuthorizeGuard)
);


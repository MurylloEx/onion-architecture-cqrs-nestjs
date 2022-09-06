import { SetMetadata } from '@nestjs/common';

export const IgnoreResponseDefault = () => SetMetadata('aop:ignore-response-default', true);

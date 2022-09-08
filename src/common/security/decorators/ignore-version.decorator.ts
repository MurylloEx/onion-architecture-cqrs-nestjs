import { SetMetadata } from '@nestjs/common';

export const IgnoreAppVersion = () => SetMetadata('aop:ignore-app-version', true);

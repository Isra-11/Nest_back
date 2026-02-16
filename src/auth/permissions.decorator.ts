import { SetMetadata } from '@nestjs/common';

export const Permissions = (module: string, action: string) =>
  SetMetadata('permissions', { module, action });

import { SetMetadata } from '@nestjs/common';

export const Check = (...args: string[]) => SetMetadata('check', args);

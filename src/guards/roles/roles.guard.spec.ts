import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('should be defined', () => {
    const reflectorMock = {} as Reflector;
    expect(new RolesGuard(reflectorMock)).toBeDefined();
  });
});

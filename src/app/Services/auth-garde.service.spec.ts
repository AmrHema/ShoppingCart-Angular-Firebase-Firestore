import { TestBed } from '@angular/core/testing';

import { AuthGardeService } from './auth-garde.service';

describe('AuthGardeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGardeService = TestBed.get(AuthGardeService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserIDService } from './user-id.service';

describe('UserIDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserIDService = TestBed.get(UserIDService);
    expect(service).toBeTruthy();
  });
});

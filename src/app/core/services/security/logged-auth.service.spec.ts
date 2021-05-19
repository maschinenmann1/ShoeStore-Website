import { TestBed } from '@angular/core/testing';

import { LoggedAuthService } from './logged-auth.service';

describe('LoggedAuthService', () => {
  let service: LoggedAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

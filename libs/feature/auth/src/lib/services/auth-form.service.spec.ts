import { TestBed } from '@angular/core/testing';

import { AuthFormService } from './auth-form.service';

describe('AuthFormService', () => {
  let service: AuthFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

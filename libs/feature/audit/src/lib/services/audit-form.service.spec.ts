import { TestBed } from '@angular/core/testing';

import { AuditFormService } from './audit-form.service';

describe('AuditFormService', () => {
  let service: AuditFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AuditStateService } from './audit-state.service';

describe('AuditStateService', () => {
  let service: AuditStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

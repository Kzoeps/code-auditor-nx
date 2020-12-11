import { TestBed } from '@angular/core/testing';

import { AuditBlService } from './audit-bl.service';

describe('AuditBlService', () => {
  let service: AuditBlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditBlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

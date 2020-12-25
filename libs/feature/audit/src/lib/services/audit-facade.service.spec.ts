import { TestBed } from '@angular/core/testing';

import { AuditFacadeService } from './audit-facade.service';

describe('AuditFacadeService', () => {
  let service: AuditFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

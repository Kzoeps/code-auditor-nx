import { TestBed } from '@angular/core/testing';

import { TeamFacadeService } from './team-facade.service';

describe('TeamFacadeService', () => {
  let service: TeamFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

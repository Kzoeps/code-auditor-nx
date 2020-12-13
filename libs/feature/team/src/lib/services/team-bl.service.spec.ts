import { TestBed } from '@angular/core/testing';

import { TeamBlService } from './team-bl.service';

describe('TeamBlService', () => {
  let service: TeamBlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamBlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

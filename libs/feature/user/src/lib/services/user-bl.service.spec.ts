import { TestBed } from '@angular/core/testing';

import { UserBlService } from './user-bl.service';

describe('UserBlService', () => {
  let service: UserBlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

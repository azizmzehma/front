import { TestBed } from '@angular/core/testing';

import { CreationSessionService } from './creation-session.service';

describe('CreationSessionService', () => {
  let service: CreationSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

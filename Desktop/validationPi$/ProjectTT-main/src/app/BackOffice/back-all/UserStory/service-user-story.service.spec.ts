import { TestBed } from '@angular/core/testing';

import { ServiceUserStoryService } from './service-user-story.service';

describe('ServiceUserStoryService', () => {
  let service: ServiceUserStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUserStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

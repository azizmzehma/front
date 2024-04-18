import { TestBed } from '@angular/core/testing';

import { ProjectLikeService } from './project-like.service';

describe('ProjectLikeService', () => {
  let service: ProjectLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

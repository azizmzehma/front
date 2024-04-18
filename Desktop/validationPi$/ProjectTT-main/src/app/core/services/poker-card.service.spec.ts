import { TestBed } from '@angular/core/testing';

import { PokerCardService } from './poker-card.service';

describe('PokerCardService', () => {
  let service: PokerCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokerCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StreamertestService } from './streamertest.service';

describe('StreamertestService', () => {
  let service: StreamertestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamertestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

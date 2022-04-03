import { TestBed } from '@angular/core/testing';

import { IshaApacService } from './isha-apac.service';

describe('IshaApacService', () => {
  let service: IshaApacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IshaApacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

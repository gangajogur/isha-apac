import { TestBed } from '@angular/core/testing';

import { CountrySelectorService } from './country-selector.service';

describe('CountrySelectorService', () => {
  let service: CountrySelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountrySelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

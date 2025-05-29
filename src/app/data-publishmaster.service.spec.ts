import { TestBed } from '@angular/core/testing';

import { DataPublishmasterService } from './data-publishmaster.service';

describe('DataPublishmasterService', () => {
  let service: DataPublishmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPublishmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DataPublishService } from './data-publish.service';

describe('DataPublishService', () => {
  let service: DataPublishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPublishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MultichainService } from './multichain.service';

describe('MultichainService', () => {
  let service: MultichainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultichainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

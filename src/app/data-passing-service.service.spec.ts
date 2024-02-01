import { TestBed } from '@angular/core/testing';

import { DataPassingServiceService } from './data-passing-service.service';

describe('DataPassingServiceService', () => {
  let service: DataPassingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPassingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

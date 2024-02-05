import { TestBed } from '@angular/core/testing';

import { RecTaskErrorHandlerService } from './rec-task-error-handler.service';

describe('RecTaskErrorHandlerService', () => {
  let service: RecTaskErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecTaskErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

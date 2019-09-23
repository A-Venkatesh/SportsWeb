import { TestBed } from '@angular/core/testing';

import { ErrorMsgProviderService } from './error-msg-provider.service';

describe('ErrorMsgProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorMsgProviderService = TestBed.get(ErrorMsgProviderService);
    expect(service).toBeTruthy();
  });
});

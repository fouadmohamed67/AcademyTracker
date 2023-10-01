import { TestBed } from '@angular/core/testing';

import { HttpApisService } from './http-apis.service';

describe('HttpApisService', () => {
  let service: HttpApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

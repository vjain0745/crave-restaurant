import { TestBed } from '@angular/core/testing';

import { SpineerService } from './spineer.service';

describe('SpineerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpineerService = TestBed.get(SpineerService);
    expect(service).toBeTruthy();
  });
});

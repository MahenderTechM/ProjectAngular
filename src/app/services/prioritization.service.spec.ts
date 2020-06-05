import { TestBed } from '@angular/core/testing';

import { PrioritizationService } from './prioritization.service';

describe('PrioritizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrioritizationService = TestBed.get(PrioritizationService);
    expect(service).toBeTruthy();
  });
});

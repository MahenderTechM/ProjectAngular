import { TestBed } from '@angular/core/testing';

import { NewprojectService } from './newproject.service';

describe('NewprojectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewprojectService = TestBed.get(NewprojectService);
    expect(service).toBeTruthy();
  });
});

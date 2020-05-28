import { TestBed } from '@angular/core/testing';

import { FractalService } from './fractal.service';

describe('FractalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FractalService = TestBed.get(FractalService);
    expect(service).toBeTruthy();
  });
});

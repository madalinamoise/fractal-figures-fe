import {inject, TestBed} from '@angular/core/testing';

import {InitialGuard} from './initial.guard';

describe('InitialGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitialGuard]
    });
  });

  it('should ...', inject([InitialGuard], (guard: InitialGuard) => {
    expect(guard).toBeTruthy();
  }));
});

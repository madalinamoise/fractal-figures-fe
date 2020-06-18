import { TestBed } from '@angular/core/testing';

import { PathNavigationCommunicationService } from './path-navigation-communication.service';

describe('PathNavigationCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PathNavigationCommunicationService = TestBed.get(PathNavigationCommunicationService);
    expect(service).toBeTruthy();
  });
});

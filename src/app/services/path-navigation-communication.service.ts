import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PathNavigationCommunicationService {
  private pathNavigationCommunicationSource = new BehaviorSubject<Array<{ name: string, repoUrl: string }>>([]);

  communication$ = this.pathNavigationCommunicationSource.asObservable();

  constructor() {
  }

  announceCommunication(dynamicPathNavigation: Array<{ name: string, repoUrl: string }>) {
    this.pathNavigationCommunicationSource.next(dynamicPathNavigation);
  }
}

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {PathNavigationCommunicationService} from '../../services/path-navigation-communication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnDestroy {
  @Output() pathChanged: EventEmitter<{ name: string, repoUrl }> = new EventEmitter<{ name: string, repoUrl }>();

  path: Array<{ name: string, repoUrl: string }> = [];
  communicationSubscription: Subscription;

  constructor(private communicationService: PathNavigationCommunicationService) {
    this.communicationSubscription = this.communicationService.communication$
      .subscribe(pathCommunicated => {
        this.path = [...pathCommunicated];
      });

  }

  onClick(element: { name: string; repoUrl: string }) {
    this.pathChanged.emit(element);
  }

  ngOnDestroy() {
    this.communicationSubscription.unsubscribe();
  }
}

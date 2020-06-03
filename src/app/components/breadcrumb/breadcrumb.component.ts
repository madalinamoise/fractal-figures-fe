import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() breadcrumpPath: Array<{ name: string, repoUrl: string }>;
  @Output() pathChanged: EventEmitter<{ name: string, repoUrl }> = new EventEmitter<{ name: string, repoUrl }>();

  path: Array<{ name: string, repoUrl: string }> = [];

  constructor() {
  }

  ngOnInit() {
    this.path = [...this.breadcrumpPath];
  }

  ngOnChanges() {
    this.path = [...this.breadcrumpPath];
  }

  onClick(element: { name: string; repoUrl: string }) {
    this.pathChanged.emit(element);
  }
}

import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {GitService} from '../../services/git.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input('breadcrumpPath') breadcrumpPath: Array<{ name: string, repoUrl: string }>;
  private path: Array<{ name: string, repoUrl: string }> = [];

  constructor(private gitService:GitService) {
  }

  ngOnInit() {
    this.path = [...this.breadcrumpPath];
  }

  ngOnChanges() {
    this.path = [...this.breadcrumpPath];
  }

  onClick(element: { name: string; repoUrl: string }) {

  }
}

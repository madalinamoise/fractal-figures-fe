import {Component, OnChanges, OnInit} from '@angular/core';
import {GitService} from '../../services/git.service';
import IGitRepositoryData from '../../models/IGitRepositoryData';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit, OnChanges {
  repositoryData: Array<IGitRepositoryData> = [];

  constructor(private gitService: GitService) {
  }

  ngOnInit() {
    this.repositoryData = [];
    this.repositoryData.push(...this.gitService.currentRepositoryData);
  }

  ngOnChanges() {
    console.log('inddd');
    this.repositoryData = [];
    this.repositoryData.push(...this.gitService.currentRepositoryData);
  }

  onClick(dirIndex) {
    console.log(this.repositoryData[dirIndex].repoUrl);
    this.gitService.getGitRepositoryDirectoryDataByUrl(this.repositoryData[dirIndex].repoUrl)
      .subscribe((data: Array<IGitRepositoryData>) => {
          this.repositoryData = [...data];
          this.gitService.currentRepositoryData = [...data];
          console.log(this.gitService.currentRepositoryData);
        }
      );
  }
}

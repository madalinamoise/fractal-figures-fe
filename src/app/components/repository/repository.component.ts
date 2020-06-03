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
  repositoryFiles: Array<IGitRepositoryData> = [];
  repositoryDirectories: Array<IGitRepositoryData> = [];

  constructor(private gitService: GitService) {
  }

  ngOnInit() {
    this.repositoryData = [];
    this.repositoryData.push(...this.gitService.currentRepositoryData);
    this.separateDataArrayByType(this.repositoryData);

  }

  ngOnChanges() {
    this.repositoryData = [];
    this.repositoryData.push(...this.gitService.currentRepositoryData);
    this.separateDataArrayByType(this.repositoryData);
  }

  onClick(dirIndex) {
    this.gitService.getGitRepositoryDirectoryDataByUrl(this.repositoryDirectories[dirIndex].repoUrl)
      .subscribe((dataArray: Array<IGitRepositoryData>) => {
          this.separateDataArrayByType(dataArray);
          this.gitService.currentRepositoryData = [...dataArray];
        }
      );
  }

  separateDataArrayByType(dataArray: Array<IGitRepositoryData>) {
    this.repositoryDirectories = [];
    this.repositoryFiles = [];
    return dataArray.forEach(data => data.repoUrl ?
      this.repositoryDirectories = [...this.repositoryDirectories, data] : this.repositoryFiles = [...this.repositoryFiles, data]
    );
  }
}

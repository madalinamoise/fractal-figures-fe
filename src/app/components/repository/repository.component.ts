import {Component, OnChanges, OnInit} from '@angular/core';
import {GitService} from '../../services/git.service';
import IGitRepositoryData from '../../models/IGitRepositoryData';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  repositoryData: Array<IGitRepositoryData> = [];
  repositoryFiles: Array<IGitRepositoryData> = [];
  repositoryDirectories: Array<IGitRepositoryData> = [];
  navigationTreePath: Array<{ name: string, repoUrl: string }> = [];

  constructor(private gitService: GitService) {
  }

  ngOnInit() {
    this.navigationTreePath = [...this.gitService.navigationTreePath];
    this.repositoryData = [];
    this.repositoryData.push(...this.gitService.currentRepositoryData);
    this.separateDataArrayByType(this.repositoryData);

  }

  onClick(data) {
    const {name, repoUrl} = data;
    this.gitService.navigationTreePath.push({name, repoUrl});
    this.getDataByRepoUrl(repoUrl);
  }

  getDataByRepoUrl(repoUrl: string) {
    return this.gitService.getGitRepositoryDirectoryDataByUrl(repoUrl)
      .subscribe((dataArray: Array<IGitRepositoryData>) => {
          this.separateDataArrayByType(dataArray);
          this.navigationTreePath = [...this.gitService.navigationTreePath];
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

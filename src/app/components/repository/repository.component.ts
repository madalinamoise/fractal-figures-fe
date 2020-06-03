import {Component, OnDestroy, OnInit} from '@angular/core';
import {GitService} from '../../services/git.service';
import IGitRepositoryData from '../../models/IGitRepositoryData';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit, OnDestroy {
  repositoryData: Array<IGitRepositoryData> = [];
  repositoryFiles: Array<IGitRepositoryData> = [];
  repositoryDirectories: Array<IGitRepositoryData> = [];
  navigationTreePath: Array<{ name: string, repoUrl: string }> = [];
  getDataByRepoUrlSubscription: Subscription;
  getDataByUsernameSubscription: Subscription;

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
    this.navigationTreePath = [...this.gitService.navigationTreePath];
    this.getDataByRepoUrl(repoUrl);
  }

  getDataByRepoUrl(repoUrl: string) {
    this.getDataByRepoUrlSubscription = this.gitService.getGitRepositoryDirectoryDataByUrl(repoUrl)
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

  onPathChange($event: { name: string; repoUrl }) {
    const index = this.navigationTreePath.indexOf($event);
    this.gitService.navigationTreePath = this.navigationTreePath = [...this.navigationTreePath.slice(0, index + 1)];
    $event.repoUrl ?
      this.getDataByRepoUrl($event.repoUrl) :
      this.gitService.getGitRepositoryDataByUsername($event.name).subscribe((dataArray: Array<IGitRepositoryData>) => {
        this.separateDataArrayByType(dataArray);
      });
  }

  ngOnDestroy() {
    if (this.getDataByRepoUrlSubscription) {
      this.getDataByRepoUrlSubscription.unsubscribe();
    }
    if (this.getDataByUsernameSubscription) {
      this.getDataByUsernameSubscription.unsubscribe();
    }
  }
}

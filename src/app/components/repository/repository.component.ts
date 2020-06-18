import {Component, OnDestroy, OnInit} from '@angular/core';
import {GitService} from '../../services/git.service';
import IGitRepositoryData from '../../models/IGitRepositoryData';
import {Subscription} from 'rxjs';
import {PathNavigationCommunicationService} from '../../services/path-navigation-communication.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  providers: [PathNavigationCommunicationService]
})
export class RepositoryComponent implements OnInit, OnDestroy {
  repositoryData: Array<IGitRepositoryData> = [];
  repositoryFiles: Array<IGitRepositoryData> = [];
  repositoryDirectories: Array<IGitRepositoryData> = [];
  navigationTreePath: Array<{ name: string, repoUrl: string }> = [];
  getDataByRepoUrlSubscription: Subscription;
  getDataByUsernameSubscription: Subscription;
  isMouseInHover: boolean;

  constructor(private gitService: GitService, private communicationService: PathNavigationCommunicationService) {
  }

  ngOnInit() {
    this.repositoryData = [];
    this.repositoryData.push(...this.gitService.currentRepositoryData);
    this.separateDataArrayByType(this.repositoryData);
    this.isMouseInHover = false;
    this.navigationTreePath = [...this.gitService.navigationTreePath];
    this.communicationService.announceCommunication(this.navigationTreePath);
  }

  onClick(data) {
    const {name, repoUrl} = data;
    this.navigationTreePath.push({name, repoUrl});
    this.getDataByRepoUrl(repoUrl);
  }

  getDataByRepoUrl(repoUrl: string) {
    this.getDataByRepoUrlSubscription = this.gitService.getGitRepositoryDirectoryDataByUrl(repoUrl)
      .subscribe((dataArray: Array<IGitRepositoryData>) => {
          this.separateDataArrayByType(dataArray);
          this.gitService.currentRepositoryData = [...dataArray];
          this.communicationService.announceCommunication(this.navigationTreePath);
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
    this.navigationTreePath = [...this.navigationTreePath.slice(0, index + 1)];
    $event.repoUrl ?
      this.getDataByRepoUrl($event.repoUrl) :
      this.gitService.getGitRepositoryDataByUsername($event.name).subscribe((dataArray: Array<IGitRepositoryData>) => {
        this.separateDataArrayByType(dataArray);
      });
  }

  ngOnDestroy() {
    this.gitService.navigationTreePath = [];
    if (this.getDataByRepoUrlSubscription) {
      this.getDataByRepoUrlSubscription.unsubscribe();
    }
    if (this.getDataByUsernameSubscription) {
      this.getDataByUsernameSubscription.unsubscribe();
    }
    this.isMouseInHover = false;
  }

  onMouseEnter(name: string) {
    if (!this.isMouseInHover) {
      this.navigationTreePath.push({name, repoUrl: ''});
      this.isMouseInHover = !this.isMouseInHover;
      this.communicationService.announceCommunication(this.navigationTreePath);
    }
  }

  onMouseLeave() {
    if (this.isMouseInHover) {
      this.navigationTreePath.pop();
      this.isMouseInHover = !this.isMouseInHover;
      this.communicationService.announceCommunication(this.navigationTreePath);
    }
  }
}

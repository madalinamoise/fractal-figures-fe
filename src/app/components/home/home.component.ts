import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GitService} from '../../services/git.service';
import {Router} from '@angular/router';
import IGitRepositoryData from '../../models/IGitRepositoryData';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  repositoryForm = new FormGroup({
    repository: new FormControl('')
  });

  private gitRepositoryDataSubscription: Subscription;

  constructor(private gitService: GitService, private router: Router) {
  }

  ngOnInit() {
    this.gitService.repositoryIsInitialized = false;
  }

  submitForm() {
    const requestPathVars = this.repositoryForm.controls.repository.value.split('/');
    this.gitRepositoryDataSubscription = this.gitService.getGitRepositoryDataByUsername(requestPathVars[0], requestPathVars[1])
      .subscribe((data: Array<IGitRepositoryData>) => {
        this.gitService.currentRepositoryData = [...data];
        this.gitService.repositoryIsInitialized = true;
        this.router.navigate(['/repository']);
      });
  }

  ngOnDestroy() {
    this.gitRepositoryDataSubscription.unsubscribe();
  }

}

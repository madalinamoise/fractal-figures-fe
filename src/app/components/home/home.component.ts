import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  showProgressBar: boolean;
  repositoryForm: FormGroup;

  private gitRepositoryDataSubscription: Subscription;

  constructor(private gitService: GitService, private router: Router) {
  }

  ngOnInit() {
    this.showProgressBar = false;
    this.gitService.repositoryIsInitialized = false;
    this.repositoryForm = new FormGroup({
      repository: new FormControl({value: '', disabled: this.showProgressBar}, [Validators.required, Validators.pattern(/\w+\/\w+/)])
    });

  }

  get repositoryFormControl() {
    return this.repositoryForm.get('repository');
  }

  submitForm() {
    this.showProgressBar = true;
    this.gitRepositoryDataSubscription = this.gitService.getGitRepositoryDataByUsername(this.repositoryForm.controls.repository.value)
      .subscribe((data: Array<IGitRepositoryData>) => {
        this.gitService.currentRepositoryData = [...data];
        this.gitService.repositoryIsInitialized = true;
        this.gitService.navigationTreePath.push({name: this.repositoryForm.controls.repository.value, repoUrl: ''});
        this.router.navigate(['/repository']);
      });
  }

  ngOnDestroy() {
    if (this.gitRepositoryDataSubscription) {
      this.gitRepositoryDataSubscription.unsubscribe();
    }
    this.showProgressBar = false;
  }

}

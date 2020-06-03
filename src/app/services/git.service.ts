import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import IGitRepositoryData from '../models/IGitRepositoryData';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  // tslint:disable-next-line:variable-name
  private _repositoryIsInitialized = false;
  // tslint:disable-next-line:variable-name
  private _currentRepositoryData: Array<IGitRepositoryData>;

  public navigationTreePath: Array<{ name: string, repoUrl: string }> = [];

  constructor(private gitClient: HttpClient) {
  }

  get currentRepositoryData(): Array<IGitRepositoryData> {
    return this._currentRepositoryData;
  }

  set currentRepositoryData(value: Array<IGitRepositoryData>) {
    this._currentRepositoryData = value;
  }

  get repositoryIsInitialized(): boolean {
    return this._repositoryIsInitialized;
  }

  set repositoryIsInitialized(value: boolean) {
    this._repositoryIsInitialized = value;
  }

  getGitRepositoryTestData(): Observable<Array<IGitRepositoryData>> {
    return this.gitClient.get<Array<IGitRepositoryData>>('/assets/example.json');
  }

  getGitRepositoryDataByUsername(repository: string): Observable<Array<IGitRepositoryData>> {
    const requestPathVars = repository.split('/');
    return this.gitClient
      .get<Array<IGitRepositoryData>>(`http://localhost:8080/init-repository/${requestPathVars[0]}/${requestPathVars[1]}`);
  }

  getGitRepositoryDirectoryDataByUrl(dirUrl: string): Observable<Array<IGitRepositoryData>> {
    const username = localStorage.getItem('username');
    const repository = localStorage.getItem('repository');
    return this.gitClient.post<Array<IGitRepositoryData>>(`http://localhost:8080//path-repository/${username}/${repository}`, dirUrl);
  }

}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {GitService} from '../services/git.service';

@Injectable({
  providedIn: 'root'
})
export class InitialGuard implements CanActivate {
  constructor(private gitService: GitService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.gitService.repositoryIsInitialized) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}

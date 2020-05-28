import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../../components/home/home.component';
import {RepositoryComponent} from '../../components/repository/repository.component';
import {InitialGuard} from '../../guards/initial.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'repository', component: RepositoryComponent, canActivate: [InitialGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

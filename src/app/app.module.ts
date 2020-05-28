import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RepositoryComponent} from './components/repository/repository.component';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import { FractalComponent } from './components/repository/fractal/fractal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepositoryComponent,
    FractalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

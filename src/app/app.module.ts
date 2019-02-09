import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { GitApiService } from './core/git-api/git-api.service';
import { HttpDecorator } from './core/http-decorator/http-decorator.service';
import { CoreModule } from './core/core.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserListComponent } from './user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxPaginationModule
  ],
  providers: [
    GitApiService,
    HttpDecorator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

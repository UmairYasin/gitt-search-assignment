/**
 * Component for Git User Search
 * @author Umair Yasin
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSearchForm } from './user-search-form';
import {FormBuilder, FormGroup} from '@angular/forms';
import { GitApiService } from '../core/git-api/git-api.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subject<boolean> = new Subject<boolean>();
  constructor(private fb: FormBuilder, private gitApiService: GitApiService, private router: Router) {}

  ngOnInit(): void {
    const formModel: UserSearchForm = new UserSearchForm(this.fb);
    this.form = formModel.formGroup;
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

  onSubmit(form: any) {
   this.gitApiService.searchGitUsers(form.value.query).
   pipe(takeUntil(this.subscription)).
   subscribe(
     data => {
       this.gitApiService.setGitSearchResults(data);
       this.router.navigate(['/list']);
     },
     error => {
       console.log(error);
     });
  }
}

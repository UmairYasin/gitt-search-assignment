/**
 * Component for Git User list
 * @author Umair Yasin
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {GitApiService} from '../core/git-api/git-api.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  p = 1;
  itemsPerPage = 10;
  userList: any;
  subscription: Subject<boolean> = new Subject<boolean>();

  constructor(private gitApiService: GitApiService, private router: Router) {}

  ngOnInit(): void {
    this.userList = this.gitApiService.getGitSearchResults();
    if (!this.userList) {
      this.router.navigate(['']);
    }
    this.fetchDisplayedUserInfo();
  }

  onPageChange(selectedPage: number) {
    this.p = selectedPage;
    this.fetchDisplayedUserInfo();
  }

  fetchDisplayedUserInfo() {
    let startIndex = (this.p - 1) * this.itemsPerPage;
    const maxIndex = startIndex + 10;
    while (startIndex <= maxIndex) {
      const user = this.userList.items[startIndex];
      this.gitApiService.getUserDetail(user.url).
      pipe(takeUntil(this.subscription)).
      subscribe(
        data => {
          user.name = data.name;
          user.followers = data.followers;
          user.following = data.following;
        },
        error => {
        });
      startIndex = startIndex + 1;
    }
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}

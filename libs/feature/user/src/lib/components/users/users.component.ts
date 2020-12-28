import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserStoreState } from '../../models/user';
import "@angular/compiler"
import { UserFacadeService } from '@selise-start/user/service';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'selise-start-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  storeState$: Observable<UserStoreState>

  constructor(
    private userFacadeService: UserFacadeService
  ) {
    this.userFacadeService.initialize();
  }

  ngOnInit(): void {
    this.getUsers()
  }
  ngOnDestroy(): void{
  }
  getUsers(): void{
    this.userFacadeService.getUsers()
      .pipe(untilDestroyed(this))
      .subscribe();
    this.storeState$ = this.userFacadeService.stateChange();
  }

}

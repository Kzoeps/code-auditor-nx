import { Component, OnInit } from '@angular/core';
import { UserStoreState } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserFacadeService } from '@selise-start/user/service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'selise-start-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  storeState$: Observable<UserStoreState>;

  constructor(
    private route: ActivatedRoute,
    private userFacadeService: UserFacadeService
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  getUser(id: number): void {
    this.userFacadeService.getUserWithTeam(id)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe();
    this.storeState$ = this.userFacadeService.stateChange();
  }
}

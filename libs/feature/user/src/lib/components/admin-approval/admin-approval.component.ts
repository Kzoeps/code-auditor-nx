import { Component, OnInit } from '@angular/core';
import { UserFacadeService } from '@selise-start/user/service';
import { User, UserStoreState } from '../../models/user';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'selise-start-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {

  usersStoreState: Observable<UserStoreState>;

  constructor(
    private userFacadeService: UserFacadeService
  ) {
  }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    this.getUnapprovedUsers();
  }

  getUnapprovedUsers(): void {
    this.userFacadeService.getUnapprovedUsers().pipe(untilDestroyed(this)).subscribe();
    this.usersStoreState = this.userFacadeService.stateChange();
  }

  approve(user: User): void {
    this.userFacadeService.approveUser(user)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe({
        complete: () => {
          this.userFacadeService.snackBar('Approved Successfully');
        }
      });
  }
}

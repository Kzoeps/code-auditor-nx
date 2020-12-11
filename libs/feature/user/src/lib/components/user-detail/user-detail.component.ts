import { Component, OnInit } from '@angular/core';
import { UserStoreState } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserFacadeService } from '../../services/user-facade.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { UserFormService } from '../../services/user-form.service';
import { tap } from 'rxjs/operators';
import { ROLES } from '../../constants/constants';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// COMMENT: Potentially remove the store stateChange(); because we always need to be getting the user
@UntilDestroy()
@Component({
  selector: 'selise-start-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  storeState$: Observable<UserStoreState>;
  userDetailForm: FormGroup;
  roles = ROLES;

  constructor(
    private route: ActivatedRoute,
    private userFacadeService: UserFacadeService,
    private userFormService: UserFormService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getUser(id);
    this.userDetailForm = this.userFormService.createForm();
  }

  getUser(id: number): void {
    this.userFacadeService.getUser(id)
      .pipe(
        untilDestroyed(this),
        tap(user => {
          this.userFormService.setForm(this.userDetailForm, user);
        })
      )
      .subscribe();
    this.storeState$ = this.userFacadeService.stateChange();
  }

  byRole(role: string, userRole: string): boolean {
    return userRole === role;
  }

  updateUser(): void {
    console.log(this.userDetailForm.valid);
    if (this.userDetailForm.valid) {
      const user = this.userDetailForm.value;
      this.userFacadeService.updateUser(user)
        .pipe(untilDestroyed(this))
        .subscribe({
          complete: () => {
            this._snackBar.open('Updated Successfully', '', {
              duration: 2000
            });
          }
        });
    }
  }
}

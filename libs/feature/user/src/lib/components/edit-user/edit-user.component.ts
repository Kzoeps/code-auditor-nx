import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFacadeService } from '@selise-start/user/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { UserStoreState } from '../../models/user';
import { FORM_TYPES, ROLES } from '../../constants/constants';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'selise-start-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userState$: Observable<UserStoreState>;
  editUserForm: FormGroup;
  roles = ROLES

  constructor(
    private route: ActivatedRoute,
    private userFacadeService: UserFacadeService
  ) { }

  ngOnInit(): void {
    this.initializer()
  }

  initializer(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.getUser(id);
    this.createForm();
  }

  createForm(): void{
    this.editUserForm = this.userFacadeService.createForm(FORM_TYPES.EDITUSERFORM);
  }

  getUser(id: number): void {
    this.userFacadeService.getUser(id)
      .pipe(
        untilDestroyed(this),
        tap((user) => {
          this.userFacadeService.setForm(this.editUserForm, user);
        })
      )
      .subscribe()
    this.userState$ = this.userFacadeService.stateChange();
  }

  updateUser(): void{
    if (this.editUserForm.valid) {
      this.userFacadeService.updateUser(this.editUserForm.value)
        .pipe()
        .subscribe({
          complete: () => {
            this.userFacadeService.snackBar('User Updated')
          }
        })
    }
  }
}

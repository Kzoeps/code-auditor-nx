import { Component, OnInit } from '@angular/core';
import { User, UserStoreState } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserFacadeService } from '../../services/user-facade.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ROLES } from '../../models/user';

// COMMENT: Potentially remove the store stateChange(); because we always need to be getting the user
@UntilDestroy()
@Component({
  selector: 'selise-start-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  storeState$: Observable<UserStoreState>;
  roles = ROLES;
  userDetailForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    profileName: ['', [Validators.required]],
    email: ['', [Validators.email]],
    role: ['', [Validators.required]]
  });

  constructor(private route: ActivatedRoute, private userFacadeService: UserFacadeService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  getUser(id: number): void {
    this.userFacadeService.getUser(id)
      .pipe(
        untilDestroyed(this),
        tap(user => {
          // TODO: DRY
          this.userDetailForm.controls.firstName.setValue(user.firstName);
          this.userDetailForm.controls.lastName.setValue(user.lastName);
          this.userDetailForm.controls.profileName.setValue(user.profileName);
          this.userDetailForm.controls.email.setValue(user.email);
          this.userDetailForm.controls.role.setValue(user.role);
        })
      )
      .subscribe();
    this.storeState$ = this.userFacadeService.stateChange();
  }

  byRole(role: string, userRole: string): boolean{
    return userRole === role;
  }
}

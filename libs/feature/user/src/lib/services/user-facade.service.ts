import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { Observable } from 'rxjs';
import { User, UserStoreState } from '../models/user';
import { map, tap } from 'rxjs/operators';
import { UserStateService } from './user-state.service';
import { FormGroup } from '@angular/forms';
import { ADD_USER_FORM, FORM_TYPES } from '../constants/constants';
import { UserFormService } from './user-form.service';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  constructor(
    private userFormService: UserFormService,
    private userApiService: UserApiService,
    private userStateService: UserStateService,
    private _snackBar: MatSnackBar
  ) {
  }

  initialize(): void {
    this.userStateService.initialState();
  }

  snackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, '', {
      duration: 2000
    });
  }

  stateChange(): Observable<UserStoreState> {
    return this.userStateService.stateChanged;
  }

  getUsers(): Observable<User[]> {
    return this.userApiService.getUsers().pipe(
      tap(users => {
        this.userStateService.updateUsers(users);
      })
    );
  }

  getUnapprovedUsers(): Observable<User[]> {
    return this.userApiService.getUsers()
      .pipe(
        map((users) => {
          users = users.filter((user) => user.approved === false);
          this.userStateService.updateUsers(users);
          return users;
        })
      );
  }

  getUser(id: number): Observable<User> {
    return this.userApiService.getUser(id).pipe(
      tap(user => {
        this.userStateService.updateUser(user);
      })
    );
  }

  createForm(formType: string): FormGroup {
    switch (formType) {
      case FORM_TYPES.ADDUSERFORM:
        const userForm = this.userFormService.createForm(ADD_USER_FORM);
        this.userFormService.setMatchingPasswordValidator(userForm.controls['confirmPassword'], userForm.controls['password']);
        return userForm;
    }
  }

  updateUser(user: User): Observable<User> {
    return this.userApiService.updateUser(user)
      .pipe(
        tap(updatedUser => {
          this.userStateService.updateUser(updatedUser);
        })
      );
  }

  addUser(addUserForm: FormGroup): Observable<Object> {
    const user = addUserForm.value;
    user.profileName = user.firstName + ' ' + user.lastName;
    user.approved = true;
    return this.userApiService.addUser(user);
  }

  approveUser(user: User): Observable<User> {
    user.approved = true;
    this.userStateService.removeUser(user);
    return this.userApiService.updateUser(user)
      .pipe(
        tap((approvedUser)=> {
          this.userStateService.removeUser(user);
        })
      )
  }
}

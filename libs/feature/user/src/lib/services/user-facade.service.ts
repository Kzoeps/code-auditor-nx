import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { forkJoin, Observable } from 'rxjs';
import { User, UserStoreState } from '../models/user';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserStateService } from './user-state.service';
import { FormGroup } from '@angular/forms';
import { ADD_USER_FORM, EDIT_USER_FORM, FORM_TYPES } from '../constants/constants';
import { UserFormService } from './user-form.service';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SharedServiceService } from '@selise-start/shared';
import { Team } from '@selise-start/team';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  constructor(
    private userFormService: UserFormService,
    private userApiService: UserApiService,
    private userStateService: UserStateService,
    private _snackBar: MatSnackBar,
    private sharedService: SharedServiceService
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
      map((users) => {
        return users.filter((eachUser) => eachUser.approved === true);
      }),
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

  getUserWithTeam(id: number): Observable<Team[]> {
    return this.getUser(id).pipe(
      switchMap((user) => this.getTeams(user)
        .pipe(
          tap((teams) => {
            this.userStateService.setTeam(teams);
          })
        )
      )
    );
  }

  getTeams(user): Observable<any> {
    return forkJoin(
      user.memberOnTeams.map((teamID: number) => this.getTeam(teamID))
    );
  }

  createForm(formType: string): FormGroup {
    switch (formType) {
      case FORM_TYPES.ADDUSERFORM:
        const userForm = this.userFormService.createForm(ADD_USER_FORM);
        this.userFormService.setMatchingPasswordValidator(userForm.controls['confirmPassword'], userForm.controls['password']);
        return userForm;
      case FORM_TYPES.EDITUSERFORM:
        return this.userFormService.createForm(EDIT_USER_FORM);
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

  addTeamToState(team: Team): void {
    this.userStateService.addTeam(team);
  }

  approveUser(user: User): Observable<User> {
    user.approved = true;
    this.userStateService.removeUser(user);
    return this.userApiService.updateUser(user)
      .pipe(
        tap((approvedUser) => {
          this.userStateService.removeUser(approvedUser);
        })
      );
  }

  setForm(form: FormGroup, user: User): void {
    this.userFormService.setForm(form, user);
  }

  getTeam(id: number): Observable<Team> {
    return this.sharedService.getTeam(id);
  }

}

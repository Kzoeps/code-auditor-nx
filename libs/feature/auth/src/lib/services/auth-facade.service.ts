import { Injectable } from '@angular/core';
import { AuthFormService } from './auth-form.service';
import { FORM_TYPES, LOGIN_FORM, SIGN_UP_FORM } from '../constants/constants';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { User } from '@selise-start/user';
import { AuthApiService } from './auth-api.service';
import { Observable } from 'rxjs';
import { UserFacadeService } from '@selise-start/user/service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Location } from '@angular/common';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(
    private authFormService: AuthFormService,
    private _snackBar: MatSnackBar,
    private authApiService: AuthApiService,
    private userFacadeService: UserFacadeService,
    private jwtHelper: JwtHelperService,
    private _location: Location
  ) {
  }

  createForm(formType: string): FormGroup {
    switch (formType) {
      case FORM_TYPES.SIGNUPFORM:
        const signUpForm = this.authFormService.createForm(SIGN_UP_FORM);
        this.authFormService.setMatchingPwordValidator(signUpForm.controls['confirmPassword'], signUpForm.controls['password']);
        return signUpForm;
      case FORM_TYPES.LOGINFORM:
        return this.authFormService.createForm(LOGIN_FORM);
    }
  }

  snackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, '', {
      duration: 2000
    });
  }

  register(signUpForm: FormGroup): Observable<User> {
    const user = new User();
    this.assignValues(user, signUpForm.value);
    user.profileName = signUpForm.value.firstName + ' ' + signUpForm.value.lastName;
    user.approved = false;
    return this.authApiService.register(user);
  }

  decodeJWT(token: string): Object | null {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getUser(uid: number): Observable<User> {
    return this.userFacadeService.getUser(uid);
  }

  login(loginForm: FormGroup): Observable<Object> {
    return this.authApiService.login(loginForm.value);
  }

  assignValues(objectToAssign: Object, objectAssigner: Object): void {
    Object.keys(objectAssigner).forEach((eachKey) => {
      if (objectAssigner[eachKey]) {
        objectToAssign[eachKey] = objectAssigner[eachKey];
      }
    });
  }

  isAuthenticated(): boolean {
    const user = this.getUserFromStorage();
    if (user) {
      const token = user.token;
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAdmin(): boolean {
    const user = this.getUserFromStorage();
    return user.admin === true;
  }

  isResourceOwner(id: number): boolean{
    const user = this.getUserFromStorage();
    return user.id === id;
  }

  goBack(): void{
    this._location.back();
  }
}

import { Injectable } from '@angular/core';
import { AuthFormService } from './auth-form.service';
import { FORM_TYPES, SIGN_UP_FORM } from '../constants/constants';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { User } from '@selise-start/user';
import { AuthApiService } from './auth-api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(
    private authFormService: AuthFormService,
    private _snackBar: MatSnackBar,
    private authApiService: AuthApiService
    ) { }

  createForm(formType: string): FormGroup {
    switch (formType) {
      case FORM_TYPES.SIGNUPFORM:
        const signUpForm = this.authFormService.createForm(SIGN_UP_FORM);
        this.authFormService.setMatchingPwordValidator(signUpForm.controls['confirmPassword'], signUpForm.controls['password']);
        return signUpForm;
    }
  }

  snackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message,'', {
      duration: 2000
    })
  }

  register(signUpForm: FormGroup): Observable<User>{
      const user = new User();
      this.assignValues(user, signUpForm.value);
      user.profileName = signUpForm.value.firstName+' '+signUpForm.value.lastName;
      user.approved = false;
      return this.authApiService.register(user)
  }

  assignValues(objectToAssign: Object, objectAssigner: Object): void {
    Object.keys(objectAssigner).forEach((eachKey) => {
      if (objectAssigner[eachKey]) {
        objectToAssign[eachKey] = objectAssigner[eachKey];
      }
    })
  }
}

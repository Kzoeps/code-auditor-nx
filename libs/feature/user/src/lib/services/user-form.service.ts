import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  constructor( private fb: FormBuilder) {
  }

  createForm(formValues: Object): FormGroup {
    const form = this.fb.group({});
    Object.keys(formValues).forEach((eachControl) => {
      form.addControl(eachControl, new FormControl(formValues[eachControl]['value']))
      form.controls[eachControl].setValidators(formValues[eachControl]['validators']);
    })
    return form;
  }

  setForm(form: FormGroup, user: User) {
    Object.keys(form.controls).forEach(controlName => {
      if (user[controlName]) {
        form.controls[controlName].setValue(user[controlName]);
      }
    })
  }

  setMatchingPasswordValidator(control: AbstractControl, password: AbstractControl): void {
    control.setValidators([Validators.required, matchingPasswords(password)]);
  }
}
export function matchingPasswords(password: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const match = password.value === control.value;
    return match ? null : { matchingPasswords: { value: control.value } };
  };
}

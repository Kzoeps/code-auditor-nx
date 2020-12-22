import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthFormService {

  constructor(private fb: FormBuilder) {
  }

  createForm(formValues: Object): FormGroup {
    const form = this.fb.group({});
    Object.keys(formValues).forEach((eachValue) => {
      form.addControl(eachValue, new FormControl(formValues[eachValue]['value']));
      form.controls[eachValue].setValidators(formValues[eachValue]['validators']);
    });
    return form;
  }

  setMatchingPwordValidator(control: AbstractControl, password: AbstractControl): void {
    control.setValidators([Validators.required, matchingPasswords(password)]);
  }
}

export function matchingPasswords(password: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const match = password.value === control.value;
    return match ? null : { matchingPasswords: { value: control.value } };
  };
}

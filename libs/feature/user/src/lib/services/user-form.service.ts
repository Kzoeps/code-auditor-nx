import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { USER_FORM } from '../constants/constants';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  formValues = USER_FORM;
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

  // createForm(): FormGroup {
  //   const userForm = this.fb.group({});
  //   this.formValues.forEach((formValue) => {
  //     if (formValue === 'email') {
  //       userForm.addControl(formValue, new FormControl('',[Validators.required, Validators.email]))
  //     } else {
  //       userForm.addControl(formValue, new FormControl('', [Validators.required]));
  //     }
  //   })
  //   return userForm;
  // }

  setForm(form: FormGroup, user: User) {
    Object.keys(form.controls).forEach(controlName => {
      form.controls[controlName].setValue(user[controlName]);
    })
  }

  validForm(form: FormGroup): boolean {
    return form.valid;
  }
}

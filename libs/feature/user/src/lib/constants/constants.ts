import { Validators } from '@angular/forms';

export const EDIT_USER_FORM = {
  id: {
    validators: [Validators.required],
    value: '',
  },
  firstName: {
    validators: [Validators.required],
    value: ''
  },
  lastName: {
    validators: [Validators.required],
    value: ''
  },
  email: {
    validators: [Validators.required, Validators.email],
    value: ''
  },
  profileName: {
    validators: [Validators.required, Validators.minLength(6)],
    value: ''
  },
  role: {
    validators: [Validators.required],
    value: ''
  }
}


export const ADD_USER_FORM = {
  firstName: {
    validators: [Validators.required],
    value: ''
  },
  lastName: {
    validators: [Validators.required],
    value: ''
  },
  email: {
    validators: [Validators.required, Validators.email],
    value: ''
  },
  password: {
    validators: [Validators.required, Validators.minLength(6)],
    value: ''
  },
  confirmPassword: {
    validators: [Validators.required],
    value: ''
  },
  role: {
    validators: [Validators.required],
    value: ''
  }
}

export const FORM_TYPES = {
  ADDUSERFORM: 'ADD_USER_FORM',
  EDITUSERFORM: 'EDIT_USER_FORM'
}

export const ROLES = [
  'FE',
  'BE',
  'UI',
  'UX',
  'BA',
  'QA',
  'PM'
];

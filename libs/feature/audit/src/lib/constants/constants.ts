import { Validators } from '@angular/forms';

export const ADD_AUDIT_FORM = {
  auditee: [Validators.required],
  auditors: [],
  auditStartDate: [Validators.required],
  status: [Validators.required]
}

export const STATUS = [
  'on-going',
  'cancelled',
  'closed'
]

export const EDIT_AUDIT_FORM = {
  id: [Validators.required],
  auditee: [Validators.required],
  auditors: [],
  auditStartDate: [Validators.required],
  status: [Validators.required],
  memos: [],
  resolved: [],
  tbd: []
}

export const FORM_TYPES = {
  ADDFORM: 'ADD_AUDIT_FORM',
  EDITFORM: 'EDIT_AUDIT_FORM',
}

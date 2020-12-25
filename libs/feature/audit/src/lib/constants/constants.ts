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
  createMemoDescription: [],
  createMemoAssignee: [],
  createMemoDesignatedAssignees: [],
}

export const EDIT_AUDIT_FORMARRAYS = [
  'memos',
  'resolved',
  'tbd'
]
export const FORM_TYPES = {
  ADDFORM: 'ADD_AUDIT_FORM',
  EDITFORM: 'EDIT_AUDIT_FORM',
  MEMOFORM: 'MEMO_FORM'
}

export const MEMO_FORM = {
  id: [Validators.required],
  description: [Validators.required],
  assignedTo: [],
  section: [],
  newMemoAssignee: [],
}
export const MEMO_SECTIONS = [
  'memos',
  'resolved',
  'tbd'
]

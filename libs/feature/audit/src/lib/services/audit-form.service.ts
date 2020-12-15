import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ADD_AUDIT_FORM } from '../constants/constants';
import { Team } from '@selise-start/team';
import { Audit } from '../models/audit';

@Injectable({
  providedIn: 'root'
})
export class AuditFormService {

  constructor(private fb: FormBuilder) {
  }

  createForm(formValues: Object): FormGroup {
    const form = this.fb.group({});
    // tslint:disable-next-line:forin
    for (const control in formValues) {
      form.addControl(control, new FormControl(''));
      form.controls[control].setValidators(formValues[control]);
    }
    return form;
  }

  validateAuditor(auditor: Team, auditee: Team): boolean {
    return !(auditor.id === auditee.id);
  }

  setForm(form: FormGroup, audit: Audit) {
    Object.keys(form.controls).forEach(controlName => {
      if (controlName !== 'auditors') {
        form.controls[controlName].setValue(audit[controlName]);
      }
    })
  }

  validateForm(audit: Audit): string {
    const auditee = audit.auditee;
    const auditors = audit.auditors;
    let found = false;
    auditors.forEach( auditor => {
      if(auditee.id===auditor.id) found=true;
    })
    if (found) return "Auditee cannot be an Auditor!";
    return "";
  }

  clearForm(form: FormGroup): void {
    form.reset();
  }
}

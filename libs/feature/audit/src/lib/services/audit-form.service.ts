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

  createForm(): FormGroup {
    const form = this.fb.group({});
    const formValues = ADD_AUDIT_FORM;
    formValues.forEach((formValue) => {
      if (formValue === 'auditors') {
        form.addControl(formValue, new FormControl(''));
      } else {
        form.addControl(formValue, new FormControl('', [Validators.required]));
      }
    });
    return form;
  }

  validateAuditor(auditor: Team, auditee: Team): boolean {
    return !(auditor.id === auditee.id);
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

import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EDIT_AUDIT_FORMARRAYS, MEMO_FORM } from '../constants/constants';
import { Team } from '@selise-start/team';
import { Audit } from '../models/audit';
import { User } from '@selise-start/user';
import { Memo } from '../models/memo';

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

  createFormArray(arrayName: string, form: FormGroup): void {
    form.addControl(arrayName, this.fb.array([]));
  }

  addControlToArray(arrayName: string, form: FormGroup, formToAdd: FormGroup): void {
    const formArray: FormArray = form.get(arrayName) as FormArray;
    formArray.push(formToAdd);
  }

  validateAuditor(auditor: Team, auditee: Team): boolean {
    return !(auditor.id === auditee.id);
  }

  setForm(form: FormGroup, formValues: Object) {
    Object.keys(form.controls).forEach(controlName => {
      if (formValues[controlName] && EDIT_AUDIT_FORMARRAYS.includes(controlName)) {
        const formArrayValues = form.get(controlName).value;
        const array = form.get(controlName) as FormArray;
        formValues[controlName].forEach((eachMemo) => {
          if (!(this.findMember(formArrayValues, eachMemo))) {
            const memoForm = this.createForm(MEMO_FORM);
            this.setForm(memoForm, eachMemo);
            array.push(memoForm);
          }
        });
      } else {
        if (formValues[controlName]) {
          form.controls[controlName].setValue(this.makeImmutable(formValues[controlName]));
        }
      }
    });
  }

  validateForm(audit: Audit): string {
    const auditee = audit.auditee;
    const auditors = audit.auditors;
    let found = false;
    auditors.forEach(auditor => {
      if (auditee.id === auditor.id) found = true;
    });
    if (found) return 'Auditee cannot be an Auditor!';
    return '';
  }

  makeImmutable(formValue: any): any {
    if (Array.isArray(formValue)) {
      return formValue.slice(0, formValue.length);
    }
    return formValue;
  }

  clearForm(form: FormGroup): void {
    form.reset();
  }

  findMember(memoAssignees: User[] | Memo[], memoAssignee: User | Memo): boolean {
    let found = false;
    memoAssignees.forEach((eachAssignee) => {
      if (eachAssignee.id === memoAssignee.id) {
        found = true;
      }
    });
    return found;
  }

  addNewMemoAssignee(auditForm: FormGroup): void {
    const newMemoAssignee = auditForm.controls['createMemoAssignee'].value;
    const memoAssignees = auditForm.get('createMemoDesignatedAssignees');
    if (newMemoAssignee) {
      if (!(memoAssignees.value)) {
        memoAssignees.setValue([newMemoAssignee]);
      } else {
        if (!(this.findMember(memoAssignees.value, newMemoAssignee))) {
          memoAssignees.value.push(newMemoAssignee);
        }
      }
    }
  }

  addAssigneeToMemo(auditForm: FormGroup, section: 'memos' | 'resolved' | 'tbd' | '', index: number): void {
    const memoAssignees = auditForm.get(section).value[index].assignedTo;
    const newAssignee = auditForm.get(section).value[index].newMemoAssignee;
    if (!(this.findMember(memoAssignees, newAssignee))) {
      memoAssignees.push(newAssignee);
    }
  }

  removeMemoAssignee(assignee: User, auditForm: FormGroup, section: 'memos' | 'resolved' | 'tbd', index?: number): void {
    if (index >= 0) {
      const memoAssignee = auditForm.get(section).value;
      this.removeFromArray(memoAssignee[index].assignedTo, assignee);
    } else {
      const memoAssignees = auditForm.get('createMemoDesignatedAssignees').value;
      this.removeFromArray(memoAssignees, assignee);
    }
  }

  removeFromArray(array: Array<any>, item: any): void {
    array.forEach((eachElement) => {
      if (eachElement.id === item.id) {
        const itemIndex = array.indexOf(eachElement);
        array.splice(itemIndex, 1);
      }
    });
  }

  removeMemo(index: number, section: 'memos' | 'resolved' | 'tbd', auditForm: FormGroup): void {
    const sectionArray = auditForm.get(section) as FormArray;
    sectionArray.removeAt(index);
  }

  moveMemo(memoIndex: number, currentMemoSection: 'memos' | 'resolved' | 'tbd', auditForm: FormGroup): [boolean, 'resolved' | 'memos' | 'tbd' | '', Memo] {
    const currentSectionArray = auditForm.get(currentMemoSection) as FormArray;
    const memo = currentSectionArray.controls[memoIndex] as FormGroup;
    const sectionToMove = currentSectionArray.controls[memoIndex].get('section').value;
    if (sectionToMove !== currentMemoSection) {
      this.addControlToArray(sectionToMove, auditForm, memo);
      this.removeMemo(memoIndex, currentMemoSection, auditForm);
      return [true, sectionToMove, memo.value];
    }
    return [false, '', memo.value];
  }
}

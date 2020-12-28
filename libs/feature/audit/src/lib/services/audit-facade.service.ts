import { Injectable } from '@angular/core';
import { AuditApiService } from './audit-api.service';
import { Audit, AuditStoreState } from '../models/audit';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { FormGroup } from '@angular/forms';
import { AuditFormService } from './audit-form.service';
import { Team, TeamFacadeService } from '@selise-start/team';
import { tap } from 'rxjs/operators';
import { AuditStateService } from './audit-state.service';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import {
  ADD_AUDIT_FORM,
  EDIT_AUDIT_FORM,
  EDIT_AUDIT_FORMARRAYS,
  FORM_TYPES,
  MEMO_FORM,
  MEMO_SECTIONS
} from '../constants/constants';
import { Memo } from '../models/memo';
import { User } from '@selise-start/user';
import { SharedServiceService } from '@selise-start/shared';

@Injectable({
  providedIn: 'root'
})
export class AuditFacadeService {

  constructor(
    private auditApiService: AuditApiService,
    private auditFormService: AuditFormService,
    private teamFacadeService: TeamFacadeService,
    private auditStateService: AuditStateService,
    private sharedService: SharedServiceService,
    private _snackBar: MatSnackBar
  ) {
  }

  stateChange(): Observable<AuditStoreState> {
    return this.auditStateService.stateChanged;
  }

  createAudit(auditForm: FormGroup): Observable<Audit> {
    auditForm.controls.status.setValue('on-going');
    if (auditForm.valid && this.validAuditors()) {
      const audit = auditForm.value;
      audit.auditors = this.getAuditors();
      return this.auditApiService.createAudit(audit)
        .pipe(
          tap({
            complete: () => {
              this.initialState();
            }
          })
        );
    }
  }

  validAuditors(): boolean {
    const auditors = this.getAuditors();
    return auditors.length > 0 && true;
  }

  initialState(): void {
    this.auditStateService.initialState();
  }

  validateForm(auditForm: FormGroup): string {
    const auditors = this.getAuditors();
    const audit = auditForm.value;
    audit.auditors = auditors;
    auditForm.controls.status.setValue('on-going');
    if (auditForm.valid) {
      if (this.validAuditors()) {
        return this.auditFormService.validateForm(audit);
      } else {
        return 'At least One Auditor Required';
      }
    }
  }

  snackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, '', {
      duration: 2000
    });
  }

  clearForm(form: FormGroup): void {
    this.auditFormService.clearForm(form);
  }

  createForm(formType: string): FormGroup {
    const formTypes = FORM_TYPES;
    switch (formType) {
      case formTypes.ADDFORM:
        return this.auditFormService.createForm(ADD_AUDIT_FORM);
      case formTypes.EDITFORM:
        return this.auditFormService.createForm(EDIT_AUDIT_FORM);
      case formTypes.MEMOFORM:
        return this.auditFormService.createForm(MEMO_FORM);
    }
  }

  getTeams(): Observable<Team[]> {
    return this.teamFacadeService.getTeams()
      .pipe(
        tap(teams => {
          this.auditStateService.updateTeamsState(teams);
        })
      );
  }

  getAuditors(): Team[] {
    return this.auditStateService.getAuditors();
  }

  getAuditee(): Team {
    return this.auditStateService.getAuditee();
  }

  addAuditor(auditor: Team): string {
    if (auditor) {
      if (this.auditFormService.validateAuditor(auditor, this.getAuditee())) {
        this.auditStateService.addAuditor(auditor);
        return '';
      } else {
        return 'Auditor can not be an auditee';
      }
    }
  }

  updateAuditee(auditee: Team): void {
    this.auditStateService.updateAuditee(auditee);
  }

  removeAuditor(auditor: Team): void {
    this.auditStateService.removeAuditor(auditor);
  }

  getAudits(): Observable<Audit[]> {
    return this.auditApiService.getAudits()
      .pipe(
        tap(
          audits => {
            this.auditStateService.updateAudits(audits);
          }
        )
      );
  }

  updateAudit(audit: Audit): void {
    this.auditStateService.updateAudit(audit);
  }

  getAudit(id: number): Observable<Audit> {
    return this.auditApiService.getAudit(id)
      .pipe(
        tap(audit => {
          this.updateAudit(audit);
        })
      );
  }

  setForm(form: FormGroup, audit: object): void {
    this.auditFormService.setForm(form, audit);
  }

  createFormArray(form: FormGroup): void {
    EDIT_AUDIT_FORMARRAYS.forEach(eachArray => {
      this.auditFormService.createFormArray(eachArray, form);
    });
  }

  getMemos(): Memo[] {
    return this.auditStateService.getMemos();
  }

  updateAuditDatabase(auditForm: FormGroup): Observable<Audit> {
    const audit = auditForm.value;
    delete audit['createMemoDescription'];
    delete audit['createMemoAssignee'];
    delete audit['createMemoDesignatedAssignees'];
    audit.auditors = this.getAuditors();
    return this.auditApiService.updateAudit(audit)
      .pipe(
        tap(
          auditState => {
            this.updateAudit(auditState);
          }
        )
      );
  }

  addMemo(auditForm: FormGroup): string {
    if (auditForm.controls.createMemoDescription.value && auditForm.controls.createMemoDesignatedAssignees.value) {
      const memo = new Memo();
      memo.id = uuid();
      memo.description = auditForm.controls.createMemoDescription.value;
      memo.assignedTo = auditForm.controls.createMemoDesignatedAssignees.value;
      const memoFormGroup = this.createForm(FORM_TYPES.MEMOFORM);
      this.setForm(memoFormGroup, memo);
      this.addControlToArray('memos', auditForm, memoFormGroup);
      auditForm.controls.createMemoDescription.setValue('');
      auditForm.controls.createMemoDesignatedAssignees.setValue('');
      auditForm.controls.createMemoAssignee.setValue('');
      return '';
    } else {
      return 'Atleast one auditee member and description required.';
    }
  }

  addControlToArray(arrayName: string, form: FormGroup, formToAdd: FormGroup): void {
    this.auditFormService.addControlToArray(arrayName, form, formToAdd);
  }

  addMemoAssignee(auditForm: FormGroup, section: 'memos'|'resolved'|'tbd'|'',index?): void {
    if (index >= 0) {
      this.auditFormService.addAssigneeToMemo(auditForm, section,index);
    } else {
      this.auditFormService.addNewMemoAssignee(auditForm);
    }
  }

  validateAssignees(auditForm: FormGroup): boolean {
    let valid = auditForm.valid;
    const memoTypes = MEMO_SECTIONS;
    memoTypes.forEach((eachType) => {
      const memos = auditForm.get(eachType).value;
      memos.forEach((eachMemo) => {
        if (!(eachMemo.assignedTo.length)) {
          valid = false;
        }
      });
    })
    return valid;
  }

  removeMemoAssignee(assignee: User, form: FormGroup, section: 'memos' | 'resolved' | 'tbd', index?: number): void {
    this.auditFormService.removeMemoAssignee(assignee, form, section, index);
  }

  removeMemo(index: number, auditForm: FormGroup, section: 'resolved' | 'memos' | 'tbd'): void {
    this.auditFormService.removeMemo(index, section, auditForm);
  }

  moveMemo(memoIndex: number, fromSection: 'memos' | 'resolved' | 'tbd', auditForm: FormGroup): void {
    this.auditFormService.moveMemo(memoIndex, fromSection, auditForm);
  }

  getUserFromStorage(): User{
    return this.sharedService.getUserFromStorage();
  }

  isStatusEditable(auditors: Team[]): boolean{
    const currentUserID = this.getUserFromStorage().id;
    return auditors.filter((eachAuditor) => eachAuditor.teamLead.id === currentUserID).length > 0
  }
}

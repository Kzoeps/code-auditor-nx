import { Injectable } from '@angular/core';
import { AuditApiService } from './audit-api.service';
import { Audit, AuditStoreState } from '../models/audit';
import { Observable } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';
import { AuditFormService } from './audit-form.service';
import { Team, TeamFacadeService } from '@selise-start/team';
import { tap } from 'rxjs/operators';
import { AuditStateService } from './audit-state.service';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuditFacadeService {

  constructor(
    private auditApiService: AuditApiService,
    private auditFormService: AuditFormService,
    private teamFacadeService: TeamFacadeService,
    private auditStateService: AuditStateService,
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

  createForm(): FormGroup {
    return this.auditFormService.createForm();
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

  addAuditor(auditor: Team): boolean {
    if (auditor) {
      if (this.auditFormService.validateAuditor(auditor, this.getAuditee())) {
        this.auditStateService.addAuditor(auditor);
        return true;
      } else {
        return false;
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
}

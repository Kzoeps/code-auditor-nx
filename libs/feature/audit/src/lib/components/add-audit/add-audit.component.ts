import { Component, OnInit } from '@angular/core';
import { AuditFacadeService } from '../../services/audit-facade.service';
import { FormGroup } from '@angular/forms';
import { AuditStoreState } from '../../models/audit';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Team } from '@selise-start/team';
import { FORM_TYPES } from '../../constants/constants';

@UntilDestroy()
@Component({
  selector: 'selise-start-add-audit',
  templateUrl: './add-audit.component.html',
  styleUrls: ['./add-audit.component.css']
})
export class AddAuditComponent implements OnInit {

  addAuditForm: FormGroup;
  auditState$: Observable<AuditStoreState>;
  errorMessage: string;

  constructor(
    private auditFacadeService: AuditFacadeService
  ) {
  }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    this.initialState();
    this.createForm();
    this.getTeams();
  }

  initialState(): void {
    this.auditFacadeService.initialState();
  }

  createForm(): void {
    this.addAuditForm = this.auditFacadeService.createForm(FORM_TYPES.ADDFORM);
  }

  getTeams(): void {
    this.auditFacadeService.getTeams()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe();
    this.auditState$ = this.auditFacadeService.stateChange();
  }

  createAudit(): void {
    const errorMessage = this.auditFacadeService.validateForm(this.addAuditForm);
    if (errorMessage === '') {
      this.auditFacadeService.createAudit(this.addAuditForm)
        .pipe(
          untilDestroyed(this)
        )
        .subscribe({
          complete: () => {
            this.auditFacadeService.snackBar('Created Audit');
            this.auditFacadeService.clearForm(this.addAuditForm);
            this.errorMessage = '';
          }
        });
    } else {
      this.errorMessage = errorMessage;
    }
  }

  addAuditor(): void {
    const teamToAdd = this.addAuditForm.controls.auditors.value;
    this.auditFacadeService.addAuditor(teamToAdd);
  }

  removeAuditor(auditor: Team): void {
    this.auditFacadeService.removeAuditor(auditor);
  }
}

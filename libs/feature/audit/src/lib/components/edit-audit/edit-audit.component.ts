import { Component, OnInit } from '@angular/core';
import { AuditFacadeService } from '../../services/audit-facade.service';
import { Observable } from 'rxjs';
import { AuditStoreState } from '../../models/audit';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Team } from '@selise-start/team';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES } from '../../constants/constants';
import { audit, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'selise-start-edit-audit',
  templateUrl: './edit-audit.component.html',
  styleUrls: ['./edit-audit.component.css']
})
export class EditAuditComponent implements OnInit {

  auditStoreState$: Observable<AuditStoreState>;
  editAuditForm: FormGroup;
  errorMessage: string;
  addAuditorError: string;

  constructor(
    private auditFacadeService: AuditFacadeService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getTeams();
    this.getAudit(id);
    this.createForm();
  }

  createForm(): void {
    this.editAuditForm = this.auditFacadeService.createForm(FORM_TYPES.EDITFORM);
  }

  getTeams(): void {
    this.auditFacadeService.getTeams()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe();
    this.auditStoreState$ = this.auditFacadeService.stateChange();
  }

  getAudit(id: number): void {
    this.auditFacadeService.getAudit(id)
      .pipe(
        untilDestroyed(this),
        tap(audit => {
          this.auditFacadeService.setForm(this.editAuditForm, audit);
        })
      )
      .subscribe();
  }

  byTeamId(auditee: Team, team: Team): boolean {
    return auditee.id === team.id;
  }

  updateAudit(): void {
    const errorMessage = this.auditFacadeService.validateForm(this.editAuditForm);
    if (errorMessage) {
      this.errorMessage = errorMessage;
    } else {
      this.auditFacadeService.updateAuditDatabase(this.editAuditForm)
        .pipe(
          untilDestroyed(this)
        )
        .subscribe({
          complete: () => {
            this.auditFacadeService.snackBar('Updated Successfully!')
          }
        })
    }
  }

  removeAuditor(auditor: Team): void {
    this.auditFacadeService.removeAuditor(auditor);
  }

  addAuditor(): void {
    this.addAuditorError = this.auditFacadeService.addAuditor(this.editAuditForm.controls['auditors'].value);
  }
}

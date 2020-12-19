import { Component, OnInit } from '@angular/core';
import { AuditFacadeService } from '../../services/audit-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditStoreState } from '../../models/audit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES, STATUS } from '../../constants/constants';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'selise-start-audit-detail',
  templateUrl: './audit-detail.component.html',
  styleUrls: ['./audit-detail.component.css']
})
export class AuditDetailComponent implements OnInit {

  auditStoreState$: Observable<AuditStoreState>;
  editAuditForm: FormGroup;
  auditStatus = STATUS;

  constructor(
    private auditFacadeService: AuditFacadeService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getAudit(id);
    this.createForm();
  }

  createForm(): void {
    this.editAuditForm = this.auditFacadeService.createForm(FORM_TYPES.EDITFORM);
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
    this.auditStoreState$ = this.auditFacadeService.stateChange();
  }

  updateAudit(): void {
    this.auditFacadeService.updateAuditDatabase(this.editAuditForm)
      .pipe (
        untilDestroyed(this)
      )
      .subscribe({
        complete: () => {
          this.auditFacadeService.snackBar('Update Audit!');
        }
      });
  }

  test(memo): void{
    console.log(typeof memo)
    console.log(memo)
  }
}

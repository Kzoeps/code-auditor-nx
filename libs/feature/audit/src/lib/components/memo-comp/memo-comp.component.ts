import { Component, OnInit } from '@angular/core';
import { AuditFacadeService } from '../../services/audit-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditStoreState } from '../../models/audit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES, MEMO_SECTIONS, STATUS } from '../../constants/constants';
import { tap } from 'rxjs/operators';
import { User } from '@selise-start/user';

@UntilDestroy()
@Component({
  selector: 'selise-start-memo-comp',
  templateUrl: './memo-comp.component.html',
  styleUrls: ['./memo-comp.component.css']
})
export class MemoCompComponent implements OnInit {

  auditStoreState$: Observable<AuditStoreState>;
  auditForm: FormGroup;
  memoSuccess: string;
  sections = MEMO_SECTIONS;
  statuses = STATUS;

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
    this.getAudit(id);
    this.createForm();
  }

  getAudit(id: number): void {
    this.auditFacadeService.getAudit(id)
      .pipe(
        untilDestroyed(this),
        tap(audit => {
          this.createFormArray();
          this.auditFacadeService.setForm(this.auditForm, audit);
        })
      )
      .subscribe();
    this.auditStoreState$ = this.auditFacadeService.stateChange();
  }

  createForm(): void {
    this.auditForm = this.auditFacadeService.createForm(FORM_TYPES.EDITFORM);
  }

  createFormArray(): void {
    this.auditFacadeService.createFormArray(this.auditForm);
  }

  addMemo(): void {
    this.memoSuccess = this.auditFacadeService.addMemo(this.auditForm);
  }

  updateAudit(): void {
    if (this.auditFacadeService.validateAssignees(this.auditForm)) {
      this.auditFacadeService.updateAuditDatabase(this.auditForm)
        .pipe(
          untilDestroyed(this)
        )
        .subscribe({
          complete: () => {
            this.auditFacadeService.snackBar('Updated Succesfully');
          }
        });
    }
  }

  addMemoAssignee(section: 'memos'|'resolved'|'tbd'|'',index?): void {
    this.auditFacadeService.addMemoAssignee(this.auditForm, section,index);
  }


  removeAssignee(assignee: User, section: 'resolved' | 'memos' | 'tbd', index?: number): void {
    this.auditFacadeService.removeMemoAssignee(assignee, this.auditForm, section, index);
  }

  removeMemo(index: number, section: 'resolved' | 'memos' | 'tbd'): void {
    this.auditFacadeService.removeMemo(index, this.auditForm, section);
  }

  moveMemo(memoIndex: number, section: 'memos' | 'resolved' | 'tbd'): void {
    this.auditFacadeService.moveMemo(memoIndex, section, this.auditForm);
  }
}

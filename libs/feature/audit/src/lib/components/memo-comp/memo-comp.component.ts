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
  testForm: FormGroup;
  memoSuccess: string;
  sections: string[];

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
    this.sections = MEMO_SECTIONS;
  }

  getAudit(id: number): void {
    this.auditFacadeService.getAudit(id)
      .pipe(
        untilDestroyed(this),
        tap(audit => {
          this.createFormArray();
          this.auditFacadeService.setForm(this.testForm, audit);
        })
      )
      .subscribe();
    this.auditStoreState$ = this.auditFacadeService.stateChange();
  }

  createForm(): void {
    this.testForm = this.auditFacadeService.createForm(FORM_TYPES.EDITFORM);
  }

  createFormArray(): void {
    this.auditFacadeService.createFormArray(this.testForm);
  }

  addMemo(): void {
    this.memoSuccess = this.auditFacadeService.addMemo(this.testForm);
  }

  updateAudit(): void {
    if (this.auditFacadeService.validateAssignees(this.testForm)) {
      this.auditFacadeService.updateAuditDatabase(this.testForm)
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
    this.auditFacadeService.addMemoAssignee(this.testForm, section,index);
  }


  removeAssignee(assignee: User, section: 'resolved' | 'memos' | 'tbd', index?: number): void {
    this.auditFacadeService.removeMemoAssignee(assignee, this.testForm, section, index);
  }

  removeMemo(index: number, section: 'resolved' | 'memos' | 'tbd'): void {
    this.auditFacadeService.removeMemo(index, this.testForm, section);
  }

  moveMemo(memoIndex: number, section: 'memos' | 'resolved' | 'tbd'): void {
    this.auditFacadeService.moveMemo(memoIndex, section, this.testForm);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { AuditFacadeService } from '../../services/audit-facade.service';
import { BehaviorSubject } from 'rxjs';
import { Audit } from '../../models/audit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES, MEMO_SECTIONS, STATUS } from '../../constants/constants';
import { User } from '@selise-start/user';

@UntilDestroy()
@Component({
  selector: 'selise-start-memo-comp',
  templateUrl: './memo-comp.component.html',
  styleUrls: ['./memo-comp.component.css']
})
export class MemoCompComponent implements OnInit {

  private _audit = new BehaviorSubject<Audit>(new Audit());
  @Input()
  set audit(audit) {
    this._audit.next(audit);
  }

  get audit() {
    return this._audit.getValue();
  }

  auditForm: FormGroup;
  memoSuccess: string;
  sections = MEMO_SECTIONS;
  statuses = STATUS;
  editStatus: boolean;

  constructor(
    private auditFacadeService: AuditFacadeService
  ) {
  }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    this.createForm();
    this._audit
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(
        () => {
          this.auditFacadeService.setForm(this.auditForm, this.audit);
          this.editStatus = this.auditFacadeService.isStatusEditable(this.audit.auditors);
        }
      );
  }

  createForm(): void {
    this.auditForm = this.auditFacadeService.createForm(FORM_TYPES.EDITFORM);
    this.createFormArray();
    this.auditFacadeService.setForm(this.auditForm, this.audit);
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
            this.auditFacadeService.snackBar('Updated Successfully');
          }
        });
    }
  }

  addMemoAssignee(section: 'memos' | 'resolved' | 'tbd' | '', index?): void {
    this.auditFacadeService.addMemoAssignee(this.auditForm, section, index);
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

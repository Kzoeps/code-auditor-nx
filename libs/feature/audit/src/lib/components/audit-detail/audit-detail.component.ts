import { Component, OnInit } from '@angular/core';
import { AuditFacadeService } from '../../services/audit-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditStoreState } from '../../models/audit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup } from '@angular/forms';
import { FORM_TYPES, MEMO_SECTIONS, STATUS } from '../../constants/constants';
import { tap } from 'rxjs/operators';
import { Memo } from '../../models/memo';
import { User } from '@selise-start/user';

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
  memoSections = MEMO_SECTIONS;
  selectedOption: 'memos'|'resolved'|'tbd';

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

  createFormArray(): void{
    this.auditFacadeService.createFormArray(this.editAuditForm)
  }

  getAudit(id: number): void {
    this.auditFacadeService.getAudit(id)
      .pipe(
        untilDestroyed(this),
        tap(audit => {
          this.auditFacadeService.setForm(this.editAuditForm, audit);
          this.createFormArray();
        })
      )
      .subscribe();
    this.auditStoreState$ = this.auditFacadeService.stateChange();
  }

  addMemo(): void {
    this.auditFacadeService.addMemo(this.editAuditForm);
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

  // removeMemo(memo: Memo): void {
  //   this.auditFacadeService.removeMemoFromState(memo);
  // }

  move(memo: Memo, fromSection: string): void {
    this.auditFacadeService.moveMemoFromState(memo, fromSection, this.selectedOption);
  }

  byId(teamMember: User, user: User ) {
    return teamMember.id === user.id;
  }

  test(memo): void{
    console.log(typeof memo)
    console.log(memo)
  }
}

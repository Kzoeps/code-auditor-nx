import { Component, OnInit } from '@angular/core';
import { AuditFacadeService } from '../../services/audit-facade.service';
import { Observable } from 'rxjs';
import { AuditStoreState } from '../../models/audit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'selise-start-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css']
})
export class AuditsComponent implements OnInit {

  constructor(private auditFacadeService: AuditFacadeService) {
  }

  auditStoreState$: Observable<AuditStoreState>;

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    this.getAudits();
  }

  getAudits(): void {
    this.auditFacadeService.getAudits()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe();
    this.auditStoreState$ = this.auditFacadeService.stateChange();
  }

}

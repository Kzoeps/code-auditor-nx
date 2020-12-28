import { Component, OnInit } from '@angular/core';
import { AuditFacadeService } from '../../services/audit-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditStoreState } from '../../models/audit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'selise-start-audit-detail',
  templateUrl: './audit-detail.component.html',
  styleUrls: ['./audit-detail.component.css']
})
export class AuditDetailComponent implements OnInit {

  auditStoreState$: Observable<AuditStoreState>;

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
  }

  getAudit(id: number): void {
    this.auditFacadeService.getAudit(id)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe();
    this.auditStoreState$ = this.auditFacadeService.stateChange();
  }
}

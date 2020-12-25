import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditsComponent } from './components/audits/audits.component';
import { AddAuditComponent } from './components/add-audit/add-audit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuditDetailComponent } from './components/audit-detail/audit-detail.component';
import { MemoCompComponent } from './components/memo-comp/memo-comp.component';
import { SharedModule } from '@selise-start/shared';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, MatCardModule, MatListModule, RouterModule,
    SharedModule
  ],
  declarations: [AuditsComponent, AddAuditComponent, AuditDetailComponent, MemoCompComponent],
  exports: [AuditsComponent, AuditDetailComponent]
})
export class FeatureAuditModule {
}

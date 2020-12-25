import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditBaseComponent } from './audit-base/audit-base.component';
import {
  FeatureAuditModule,
  AuditsComponent,
  AddAuditComponent,
  AuditDetailComponent,
  MemoCompComponent
} from '@selise-start/audit';
import { AuthGuardGuard } from '@selise-start/auth';

const routes: Routes = [
  {
    path: '',
    component: AuditBaseComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: AuditsComponent
      },
      {
        path: 'add-audit',
        component: AddAuditComponent
      },
      {
        path: ':id',
        component: AuditDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FeatureAuditModule],
  exports: [RouterModule]
})
export class AuditRoutingModule { }

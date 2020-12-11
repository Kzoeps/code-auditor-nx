import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditBaseComponent } from './audit-base/audit-base.component';
import {  FeatureAuditModule, AuditsComponent } from '@selise-start/audit';

const routes: Routes = [
  {
    path: '',
    component: AuditBaseComponent,
    children: [
      {
        path: '',
        component: AuditsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FeatureAuditModule],
  exports: [RouterModule]
})
export class AuditRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditBaseComponent } from './audit-base/audit-base.component';


@NgModule({
  declarations: [AuditBaseComponent],
  imports: [
    CommonModule,
    AuditRoutingModule,
  ]
})
export class AuditModule { }

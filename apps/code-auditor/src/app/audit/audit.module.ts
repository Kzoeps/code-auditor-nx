import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditBaseComponent } from './audit-base/audit-base.component';
import { SharedModule } from '../../../../../libs/feature/shared/src';


@NgModule({
  declarations: [AuditBaseComponent],
  imports: [
    CommonModule,
    AuditRoutingModule,
    SharedModule
  ]
})
export class AuditModule { }

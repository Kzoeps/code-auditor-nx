import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditsComponent } from './components/audits/audits.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AuditsComponent],
  exports: [AuditsComponent],
})
export class AuditModule {}

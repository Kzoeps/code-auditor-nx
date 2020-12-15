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

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, MatCardModule, MatListModule, RouterModule],
  declarations: [AuditsComponent, AddAuditComponent],
  exports: [AuditsComponent],
})
export class FeatureAuditModule {}

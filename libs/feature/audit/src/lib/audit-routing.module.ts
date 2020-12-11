import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditsComponent } from './components/audits/audits.component';

const routes: Routes = [
  {
    path: 'audit',
    component: AuditsComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuditRoutingModule {
}

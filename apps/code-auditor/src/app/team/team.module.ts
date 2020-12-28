import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamBaseComponent } from './team-base/team-base.component';
import { SharedModule } from '@selise-start/shared';


@NgModule({
  declarations: [TeamBaseComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule
  ]
})
export class TeamModule { }

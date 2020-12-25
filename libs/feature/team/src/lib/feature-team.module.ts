import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { RouterModule } from '@angular/router';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@selise-start/shared';

@NgModule({
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule,
    MatOptionModule, MatButtonModule, MatCardModule, SharedModule

  ],
  declarations: [TeamsComponent, TeamDetailComponent, AddTeamComponent, EditTeamComponent],
  exports: [TeamDetailComponent, EditTeamComponent],
})
export class FeatureTeamModule {}

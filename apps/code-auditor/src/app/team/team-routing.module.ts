import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamBaseComponent } from './team-base/team-base.component';
import { AddTeamComponent, TeamDetailComponent, TeamsComponent } from '@selise-start/team';

const routes: Routes = [
  {
    path: '',
    component: TeamBaseComponent,
    children: [
      {
        path: '',
        component: TeamsComponent
      },
      {
        path: 'add-team',
        pathMatch: 'full',
        component: AddTeamComponent
      },
      {
        path: ':id',
        component: TeamDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }

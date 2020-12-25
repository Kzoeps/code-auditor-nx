import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamBaseComponent } from './team-base/team-base.component';
import { AddTeamComponent, EditTeamComponent, TeamDetailComponent, TeamsComponent } from '@selise-start/team';
import { AuthGuardGuard, AdminGuard } from '@selise-start/auth';

const routes: Routes = [
  {
    path: '',
    component: TeamBaseComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: TeamsComponent
      },
      {
        path: 'add-team',
        pathMatch: 'full',
        canActivate: [AdminGuard],
        component: AddTeamComponent
      },
      {
        path: ':id',
        component: TeamDetailComponent
      },
      {
        path: ':id/edit-team',
        canActivate: [AdminGuard],
        component: EditTeamComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }

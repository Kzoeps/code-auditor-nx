import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureUserModule, UsersComponent, UserDetailComponent } from "@selise-start/user"
import { UserBaseComponent } from './user-base/user-base.component';
import { AuthGuardGuard } from '@selise-start/auth';

const routes: Routes = [
  {
    path: '',
    component: UserBaseComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: ':id',
        component: UserDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FeatureUserModule],
  exports: [RouterModule]
})
export class UserRoutingModule { }

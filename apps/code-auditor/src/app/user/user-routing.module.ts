import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureUserModule, UsersComponent, UserDetailComponent } from "@selise-start/user"
import { UserBaseComponent } from './user-base/user-base.component';

const routes: Routes = [
  {
    path: '',
    component: UserBaseComponent,
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

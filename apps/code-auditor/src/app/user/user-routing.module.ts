import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureUserModule, UsersComponent } from "@selise-start/user"
import { UserBaseComponent } from './user-base/user-base.component';

const routes: Routes = [
  {
    path: '',
    component: UserBaseComponent,
    children: [
      {
        path: '',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FeatureUserModule],
  exports: [RouterModule]
})
export class UserRoutingModule { }

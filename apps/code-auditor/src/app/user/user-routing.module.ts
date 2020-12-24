import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  FeatureUserModule,
  UsersComponent,
  UserDetailComponent,
  AddUserComponent,
  AdminApprovalComponent,
  EditUserComponent
} from '@selise-start/user';
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
        path: 'add-user',
        component: AddUserComponent
      },
      {
        path: 'approval',
        component: AdminApprovalComponent
      },
      {
        path: ':id/edit-user',
        pathMatch: 'full',
        component: EditUserComponent
      },
      {
        path: ':id',
        component: UserDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FeatureUserModule],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

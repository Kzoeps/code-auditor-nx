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
import { AdminGuard, AuthGuardGuard, RoleGuard } from '@selise-start/auth';

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
        component: AddUserComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'approval',
        component: AdminApprovalComponent,
        canActivate: [RoleGuard]
      },
      {
        path: ':id/edit-user',
        pathMatch: 'full',
        canActivate: [RoleGuard],
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

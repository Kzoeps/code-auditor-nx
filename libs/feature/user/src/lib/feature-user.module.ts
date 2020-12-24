import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AdminApprovalComponent } from './components/admin-approval/admin-approval.component';
import { MatCardModule } from '@angular/material/card';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { SharedModule } from '@selise-start/shared';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatGridListModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    SharedModule
  ],
  declarations: [UserDetailComponent, UsersComponent, AddUserComponent, AdminApprovalComponent, EditUserComponent],
  exports: [UserDetailComponent, UsersComponent, AddUserComponent, AdminApprovalComponent, EditUserComponent],
})
export class FeatureUserModule {}

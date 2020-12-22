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
    MatButtonModule
  ],
  declarations: [UserDetailComponent, UsersComponent, AddUserComponent],
  exports: [UserDetailComponent, UsersComponent, AddUserComponent],
})
export class FeatureUserModule {}
